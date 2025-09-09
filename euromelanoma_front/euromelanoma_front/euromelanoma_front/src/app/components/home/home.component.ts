// home.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any = {};
  selectedTabIndex: number = 0;
  section?: string;

  constructor(private router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.section = params.get('section') || undefined;
      console.log(this.section);
    });
    this.loadUserData();
  }

  loadUserData(): void {
    const userHelp = sessionStorage.getItem('auth-user');
    if (userHelp) {
      this.user = JSON.parse(userHelp);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onTabChange(event: any): void {
    this.selectedTabIndex = event.index;
    console.log('Selected tab index:', this.selectedTabIndex);
  }

  getUserRoleText(userType: string): string {
    switch (userType) {
      case 'Patient':
        return 'Pacijent';
      case 'Doctor':
        return 'Lekar';
      case 'Admin':
        return 'Administrator';
      default:
        return 'Korisnik';
    }
  }

  logout(): void {
    // Obriši user podatke
    sessionStorage.removeItem('auth-user');
    sessionStorage.removeItem('auth-token');

    // Preusmeri na login stranicu
    this.router.navigate(['/login']);
  }
}
