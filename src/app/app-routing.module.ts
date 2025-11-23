import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'opportunities',
    loadChildren: () => import('./features/opportunities/opportunities.module').then(m => m.OpportunitiesModule)
  },
  // Novo módulo de organizações (inclui Feed e Perfil)
  {
    path: 'organizations',
    loadChildren: () => import('./features/organizations/organizations.module').then(m => m.OrganizationsModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
