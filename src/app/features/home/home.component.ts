import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpportunityService, Opportunity } from '../../core/services/opportunity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  opportunityService = inject(OpportunityService);
  router = inject(Router);

  // Estatísticas
  stats = [
    { value: '10.000+', label: 'Voluntários Ativos' },
    { value: '450+', label: 'Organizações Parceiras' },
    { value: '50.000+', label: 'Vidas Impactadas' },
    { value: 'R$ 2M+', label: 'Arrecadado este Ano' }
  ];

  // Formas de ajudar
  helpWays = [
    {
      icon: 'clock',
      title: 'Doe seu Tempo',
      description: 'Dedique algumas horas para fazer a diferença na vida de alguém',
      color: '#4169E1'
    },
    {
      icon: 'dollar',
      title: 'Doe Dinheiro',
      description: 'Contribua financeiramente para projetos que transformam vidas',
      color: '#10B981'
    },
    {
      icon: 'gift',
      title: 'Doe Materiais',
      description: 'Roupas, alimentos, brinquedos e outros itens necessários',
      color: '#7B3FF2'
    }
  ];

  // Tipos de organizações
  orgTypes = [
    {
      count: '250+',
      title: 'ONGs',
      description: 'Organizações focadas em causas sociais diversas',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop'
    },
    {
      count: '80+',
      title: 'Orfanatos',
      description: 'Cuidado e apoio para crianças em situação vulnerável',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=400&fit=crop'
    },
    {
      count: '120+',
      title: 'Casas de Repouso',
      description: 'Companhia e cuidado para nossos idosos',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=400&fit=crop'
    }
  ];

  ngOnInit(): void {
    // Carregar oportunidades se ainda não foram carregadas
    if (this.opportunityService.opportunities().length === 0) {
      this.opportunityService.loadOpportunities();
    }
  }

  getFeaturedOpportunities(): Opportunity[] {
    // Retornar as primeiras 3 oportunidades como destaque
    return this.opportunityService.opportunities().slice(0, 3);
  }

  navigateToOpportunities(): void {
    this.router.navigate(['/opportunities']);
  }

  viewOpportunityDetails(id: number): void {
    this.router.navigate(['/opportunities', id]);
  }
}
