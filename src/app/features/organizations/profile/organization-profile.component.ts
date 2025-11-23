import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService, Organization } from '../../../core/services/organization.service';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  standalone: false,
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private orgService = inject(OrganizationService);

  org: Organization | undefined;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orgService.getOrganizationById(id).subscribe(org => {
      this.org = org;
    });
  }
}
