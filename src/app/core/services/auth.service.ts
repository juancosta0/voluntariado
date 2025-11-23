import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';

export interface User {
  id?: number;
  username: string;
  name: string;
  email: string;
  password?: string;
  type?: 'volunteer' | 'ong';
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

  isAuthenticated = signal<boolean>(this.hasToken());
  currentUser = signal<User | null>(this.getUserFromStorage());

  constructor() {
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
    // Para teste, aceita admin/admin OU busca usuário real
    const url = `${this.API_URL}/users?username=${credentials.username}&password=${credentials.password}`;

    return this.http.get<User[]>(url).pipe(
      map(users => {
        if (users.length === 0) {
          throw new Error('Usuário ou senha incorretos');
        }

        const user = users[0];
        const token = this.generateMockToken(user);

        return { token, user };
      }),
      tap(({ token, user }) => {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this.isAuthenticated.set(true);
        this.currentUser.set(user);
      })
    );
  }

  // --- AQUI ESTÁ O MÉTODO QUE FALTAVA ---
  register(userData: any): Observable<any> {
    const newUser = {
      username: userData.username,
      password: userData.password,
      name: userData.name,
      email: userData.email,
      type: userData.type,
      avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=random`
    };

    return this.http.post<User>(`${this.API_URL}/users`, newUser).pipe(
      switchMap(createdUser => {
        // Se for ONG, cria também o perfil na coleção 'organizations'
        if (userData.type === 'ong') {
          const newOrg = {
            name: userData.orgName,
            category: userData.category,
            description: userData.description,
            fullDescription: userData.description,
            location: userData.location,
            image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800',
            logo: `https://ui-avatars.com/api/?name=${userData.orgName}&background=random&color=fff`,
            contact: userData.email,
            followers: 0,
            needs: userData.needs || []
          };
          return this.http.post(`${this.API_URL}/organizations`, newOrg).pipe(
            map(() => createdUser)
          );
        }
        return new Observable(obs => {
          obs.next(createdUser);
          obs.complete();
        });
      })
    );
  }
  // --------------------------------------

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private generateMockToken(user: User): string {
    const timestamp = Date.now();
    const tokenData = `${user.id}-${timestamp}`;
    return btoa(tokenData);
  }
}
