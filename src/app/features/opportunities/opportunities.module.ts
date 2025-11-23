import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { OpportunitiesListComponent } from './opportunities-list/opportunities-list.component';
import { OpportunityDetailComponent } from './opportunity-detail/opportunity-detail.component';

const routes: Routes = [
  {
    path: '',
    component: OpportunitiesListComponent
  },
  {
    path: ':id',
    component: OpportunityDetailComponent
  }
];

@NgModule({
  declarations: [
    OpportunitiesListComponent,
    OpportunityDetailComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OpportunitiesModule { }
