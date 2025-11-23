import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: false,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
