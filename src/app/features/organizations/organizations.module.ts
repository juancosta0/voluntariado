import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Importação dos componentes que criaremos a seguir
import { FeedComponent } from './feed/feed.component';
import { OrganizationProfileComponent } from './profile/organization-profile.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'feed',
    component: FeedComponent,
    canActivate: [authGuard] // Protege a rota para apenas logados
  },
  {
    path: ':id',
    component: OrganizationProfileComponent
  }
];

@NgModule({
  declarations: [
    FeedComponent,
    OrganizationProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrganizationsModule { }
