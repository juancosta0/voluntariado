import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpportunityService, Opportunity } from '../../../core/services/opportunity.service';

@Component({
  selector: 'app-opportunities-list',
  templateUrl: './opportunities-list.component.html',
  standalone: false,
  styleUrls: ['./opportunities-list.component.css']
})
export class OpportunitiesListComponent implements OnInit {
  private opportunityService = inject(OpportunityService);
  private router = inject(Router);

  opportunities = this.opportunityService.filteredOpportunities;
  searchTerm = this.opportunityService.searchTerm;

  ngOnInit(): void {
    this.opportunityService.loadOpportunities();
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.opportunityService.searchOpportunities(target.value);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/opportunities', id]);
  }
}
