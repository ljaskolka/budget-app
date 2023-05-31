import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  isFormVisible = false;
  historyForm!: FormGroup;
  historyItems: any[] = [];
  activeAccount: any;

  setActiveAccount(account: any): void {
    this.activeAccount = account;
    this.loadHistoryItems();
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.historyForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],

      date: ['', Validators.required],
      note: [''],
      isIncome: [false, Validators.required], // Dodajemy pole isIncome z domyślną wartością false
    });

    this.loadHistoryItems();
  }

  addHistoryItem(): void {
    if (this.historyForm.valid) {
      const historyItem = this.historyForm.value;
      historyItem.price = parseFloat(historyItem.price.replace('$', ''));
      historyItem.isIncome = historyItem.isIncome === 'true'; // Konwertujemy na typ boolean
      this.historyItems.unshift(historyItem);
      this.historyForm.reset();
      this.saveHistoryItems();
    }
  }

  setHistoryItems(history: any[]): void {
    this.historyItems = history;
  }

  deleteHistoryItem(index: number): void {
    this.historyItems.splice(index, 1);
    this.saveHistoryItems();
  }

  toggleAddHistoryForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  saveHistoryItems(): void {
    localStorage.setItem('historyItems', JSON.stringify(this.historyItems));
  }

  loadHistoryItems(): void {
    const savedItems = localStorage.getItem('historyItems');
    if (savedItems && JSON.parse(savedItems).length > 0) {
      this.historyItems = JSON.parse(savedItems);
    } else {
      this.saveHistoryItems();
    }
  }
}
