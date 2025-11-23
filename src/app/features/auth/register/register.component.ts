import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  isOng = signal(false); // Controla se mostra campos de ONG

  // Lista de necessidades possíveis
  availableNeeds = ['Alimento', 'Dinheiro', 'Roupas', 'Voluntários', 'Veterinários', 'Material Escolar', 'Móveis'];

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', Validators.required],
    type: ['volunteer', Validators.required],

    // Campos específicos de ONG
    orgName: [''],
    category: [''],
    location: [''],
    description: [''],
    needs: [[]] // Array para checkboxes
  });

  constructor() {
    // Monitora mudança no tipo de usuário
    this.registerForm.get('type')?.valueChanges.subscribe(val => {
      this.isOng.set(val === 'ong');
      if (val === 'ong') {
        this.registerForm.get('orgName')?.setValidators(Validators.required);
      } else {
        this.registerForm.get('orgName')?.clearValidators();
      }
      this.registerForm.get('orgName')?.updateValueAndValidity();
    });
  }

  onNeedChange(event: any, need: string) {
    const needsControl = this.registerForm.get('needs');
    const currentNeeds = needsControl?.value || [];

    if (event.target.checked) {
      needsControl?.setValue([...currentNeeds, need]);
    } else {
      needsControl?.setValue(currentNeeds.filter((n: string) => n !== need));
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading.set(true);

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.isLoading.set(false);
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        alert('Erro ao cadastrar.');
      }
    });
  }
}
