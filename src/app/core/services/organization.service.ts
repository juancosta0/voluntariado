import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Organization {
  id: number;
  name: string;
  category: string;
  description: string;
  fullDescription?: string;
  location: string;
  image: string;
  logo: string;
  followers: number;
}

export interface Post {
  id: number;
  organizationId: number;
  content: string;
  image?: string;
  likes: number;
  date: string;
  organization?: Organization; // Populado no frontend
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000';

  // Signals
  feed = signal<Post[]>([]);

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(`${this.API_URL}/organizations`);
  }

  getOrganizationById(id: number): Observable<Organization> {
    return this.http.get<Organization>(`${this.API_URL}/organizations/${id}`);
  }

  getFeed(): Observable<Post[]> {
    // Simula um join no frontend pegando posts e ongs
    return new Observable(observer => {
      this.http.get<Post[]>(`${this.API_URL}/posts?_sort=date&_order=desc`).subscribe(posts => {
        this.getOrganizations().subscribe(orgs => {
          const enrichedPosts = posts.map(post => ({
            ...post,
            organization: orgs.find(o => o.id === post.organizationId)
          }));
          this.feed.set(enrichedPosts);
          observer.next(enrichedPosts);
          observer.complete();
        });
      });
    });
  }
}
