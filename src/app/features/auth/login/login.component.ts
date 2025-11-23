import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Estado local
  isLoading = signal(false);
  errorMessage = signal('');

  // Formulário Reativo
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const { username, password } = this.loginForm.value;

    this.authService.login({ username: username!, password: password! })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          // Redireciona para o Feed após login
          this.router.navigate(['/organizations/feed']);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set('Usuário ou senha incorretos. (Tente: admin/admin)');
        }
      });
  }
}
