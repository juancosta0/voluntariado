import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Opportunity {
  id: number;
  title: string;
  organization: string;
  category: string;
  type: string;
  description: string;
  image: string;
  location: string;
  duration: string;
  commitment: string;
  requirements: string;
}

export interface Application {
  id?: number;
  opportunityId: number;
  userId: number;
  userName: string;
  userEmail: string;
  appliedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000';
  
  // Signals para estado
  opportunities = signal<Opportunity[]>([]);
  filteredOpportunities = signal<Opportunity[]>([]);
  searchTerm = signal<string>('');
  selectedCategory = signal<string>('all');

  constructor() {
    this.loadOpportunities();
  }

  loadOpportunities(): void {
    this.getOpportunities().subscribe(opportunities => {
      this.opportunities.set(opportunities);
      this.filteredOpportunities.set(opportunities);
    });
  }

  getOpportunities(): Observable<Opportunity[]> {
    return this.http.get<Opportunity[]>(`${this.API_URL}/opportunities`);
  }

  getOpportunityById(id: number): Observable<Opportunity> {
    return this.http.get<Opportunity>(`${this.API_URL}/opportunities/${id}`);
  }

  searchOpportunities(term: string): void {
    this.searchTerm.set(term);
    this.applyFilters();
  }

  filterByCategory(category: string): void {
    this.selectedCategory.set(category);
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.opportunities();
    
    // Filtrar por termo de busca
    const term = this.searchTerm().toLowerCase();
    if (term) {
      filtered = filtered.filter(opp => 
        opp.title.toLowerCase().includes(term) ||
        opp.organization.toLowerCase().includes(term) ||
        opp.category.toLowerCase().includes(term) ||
        opp.description.toLowerCase().includes(term)
      );
    }
    
    // Filtrar por categoria
    const category = this.selectedCategory();
    if (category && category !== 'all') {
      filtered = filtered.filter(opp => opp.category === category);
    }
    
    this.filteredOpportunities.set(filtered);
  }

  applyToOpportunity(application: Omit<Application, 'id'>): Observable<Application> {
    return this.http.post<Application>(`${this.API_URL}/applications`, application).pipe(
      tap(result => {
        console.log('Candidatura enviada com sucesso:', result);
      })
    );
  }

  getUserApplications(userId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.API_URL}/applications?userId=${userId}`);
  }

  getCategories(): string[] {
    const opportunities = this.opportunities();
    const categories = new Set(opportunities.map(opp => opp.category));
    return Array.from(categories);
  }
}
