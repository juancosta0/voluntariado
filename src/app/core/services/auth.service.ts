import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';
  
  // Signal para estado de autenticação
  isAuthenticated = signal<boolean>(this.hasToken());
  currentUser = signal<User | null>(this.getUserFromStorage());

  constructor() {
    // Verificar autenticação ao inicializar
    this.checkAuthentication();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  private checkAuthentication(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const user = this.getUserFromStorage();
    
    if (token && user) {
      this.isAuthenticated.set(true);
      this.currentUser.set(user);
    } else {
      this.isAuthenticated.set(false);
      this.currentUser.set(null);
    }
  }

  login(credentials: LoginCredentials): Observable<{ token: string; user: User }> {
    // Mock login - verificar credenciais fixas
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      // Buscar usuário do db.json
      return this.http.get<User[]>(`${this.API_URL}/users?username=${credentials.username}`).pipe(
        map(users => {
          if (users.length === 0) {
            throw new Error('Usuário não encontrado');
          }
          
          const user = users[0];
          const token = this.generateMockToken(user);
          
          return { token, user };
        }),
        tap(({ token, user }) => {
          // Salvar no LocalStorage
          localStorage.setItem(this.TOKEN_KEY, token);
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          
          // Atualizar signals
          this.isAuthenticated.set(true);
          this.currentUser.set(user);
        }),
        catchError(error => {
          console.error('Erro no login:', error);
          return throwError(() => new Error('Erro ao fazer login'));
        })
      );
    } else {
      return throwError(() => new Error('Credenciais inválidas. Use admin/admin'));
    }
  }

  logout(): void {
    // Limpar LocalStorage
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    // Atualizar signals
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private generateMockToken(user: User): string {
    // Gerar token mock (base64 do timestamp + user id)
    const timestamp = Date.now();
    const tokenData = `${user.id}-${timestamp}`;
    return btoa(tokenData);
  }
}
