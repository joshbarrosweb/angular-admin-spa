import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger('tableState', [
      state(
        'show',
        style({
          maxHeight: '150px',
        })
      ),
      state(
        'hide',
        style({
          maxHeight: '0',
        })
      ),
      transition('show => hide', animate('1000ms ease-in')),
      transition('hide => show', animate('1000ms ease-out')),
    ]),
  ],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  lastPage!: number;
  selected!: number;
  show = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.load();
  }

  load(page = 1): void {
    this.orderService.all(page).subscribe((response) => {
      this.orders = response.data;
      this.lastPage = response.meta.last_page;
    });
  }

  select(id: number): void {
    this.selected = this.selected === id ? 0 : id;
  }

  itemState(id: number): string {
    return this.selected === id ? 'show' : 'hide';
  }

  export(): void {
    this.orderService.export().subscribe((result) => {
      const blob = new Blob([result], { type: 'text/csv' });
      const downloadUrl = window.URL.createObjectURL(result);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'orders.csv';
      link.click();
    });
  }
}
