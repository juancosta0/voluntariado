import { Component, inject, OnInit } from '@angular/core';
import { OrganizationService } from '../../../core/services/organization.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  standalone: false,
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  orgService = inject(OrganizationService);
  feed = this.orgService.feed;

  ngOnInit() {
    this.orgService.getFeed().subscribe();
  }
}
