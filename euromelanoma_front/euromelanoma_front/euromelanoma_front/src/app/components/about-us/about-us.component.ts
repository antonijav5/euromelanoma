import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate(
          '0.5s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AboutUsComponent implements OnInit {
  constructor(private router: Router) {}
  user: any;

  ngOnInit(): void {
    this.loadUser();
    this.animateCounters();
  }

  private loadUser() {
    const userSession = sessionStorage.getItem('auth-user');
    if (userSession) {
      this.user = JSON.parse(userSession);
    }
  }

  animateCounters(): void {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.startCounterAnimation(entry.target);
        }
      });
    }, observerOptions);

    const statsSection = document.querySelector('.statistics-section');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  startCounterAnimation(element: Element): void {
    const counters = element.querySelectorAll('[countUp]');
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('countUp') || '0');
      let current = 0;
      const increment = target / 100;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      updateCounter();
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
