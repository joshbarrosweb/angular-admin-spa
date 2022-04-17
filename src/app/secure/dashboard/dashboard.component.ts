import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    let chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns: [['x'], ['Sales']],
        types: {
          Sales: 'bar',
        },
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d',
          },
        },
      },
    });

    this.orderService
      .chart()
      .subscribe((response: { date: string; sum: number }[]) => {
        chart.load({
          columns: [
            ['x', ...response.map((r) => r.date)],
            ['Sales', ...response.map((r) => r.sum)],
          ],
        });
      });
  }
}
