import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpportunityService, Opportunity } from '../../../core/services/opportunity.service';

@Component({
  selector: 'app-opportunity-detail',
  templateUrl: './opportunity-detail.component.html',
  standalone: false,
  styleUrls: ['./opportunity-detail.component.css']
})
export class OpportunityDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private opportunityService = inject(OpportunityService);

  opportunity = signal<Opportunity | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.opportunityService.getOpportunityById(id).subscribe(opp => {
      this.opportunity.set(opp);
    });
  }
}
