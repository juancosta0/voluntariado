import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; // Importar

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent } // Nova Rota
];

@NgModule({
  declarations: [
    LoginComponent
    // RegisterComponent é Standalone, não declare aqui, apenas importe na rota ou no imports se não fosse standalone
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RegisterComponent, // Importar componente Standalone
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
