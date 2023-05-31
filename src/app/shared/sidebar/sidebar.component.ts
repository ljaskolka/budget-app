import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() activeAccount: any;
  @Output() accountSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() historySelected: EventEmitter<any[]> = new EventEmitter<any[]>();

  accountHistories: any[] = [
    {
      name: 'mBank',
      balance: 2168,
      history: [
        {
          title: 'Bonus',
          price: 300,
          date: 'May 31',
          note: 'Performance bonus',
          isIncome: true,
        },
        {
          title: 'Gym Membership',
          price: 80,
          date: 'May 30',
          note: 'Monthly membership fee',
          isIncome: false,
        },
        {
          title: 'Movie Tickets',
          price: 23,
          date: 'May 29',
          note: 'Murder Mystery 2',
          isIncome: false,
        },
        {
          title: 'Restaurant',
          price: 29,
          date: 'May 26',
          note: 'Dinner with Mark',
          isIncome: false,
        },
        {
          title: 'Salary',
          price: 2000,
          date: 'May 24',
          note: 'Payment for work',
          isIncome: true,
        },
      ],
    },
    {
      name: 'Revolut',
      balance: 70,
      history: [
        {
          title: 'Netflix',
          price: 30,
          date: 'May 31',
          note: 'Monthly netflix payment',
          isIncome: false,
        },
        {
          title: 'Dividends',
          price: 100,
          date: 'May 28',
          note: 'Stock dividends',
          isIncome: true,
        },
      ],
    },
    {
      name: 'Santander',
      balance: 310,
      history: [
        {
          title: 'Date',
          price: 90,
          date: 'May 31',
          note: 'Date with Kate',
          isIncome: false,
        },
        {
          title: 'Rent',
          price: 800,
          date: 'May 31',
          note: 'Monthly rent payment',
          isIncome: false,
        },
        {
          title: 'Freelance Income',
          price: 1200,
          date: 'May 22',
          note: 'Web design project',
          isIncome: true,
        },
      ],
    },
  ];

  constructor(private router: Router) {}

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  ngOnInit(): void {
    if (!this.activeAccount) {
      this.activeAccount = this.accountHistories[0];
      this.emitAccountSelected(this.activeAccount);
    }
  }

  switchAccount(account: any): void {
    this.activeAccount = account;
    this.calculateBalance(account);
    this.historySelected.emit(account.history);
  }

  emitAccountSelected(account: any): void {
    this.calculateBalance(account);
    this.accountSelected.emit(account);
  }

  calculateBalance(account: any): void {
    account.balance = account.history.reduce((sum: number, item: any) => {
      if (item.isIncome) {
        sum += item.price;
      } else {
        sum -= item.price;
      }
      return sum;
    }, 0);
  }
}
