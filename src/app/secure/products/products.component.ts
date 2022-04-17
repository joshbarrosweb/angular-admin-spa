import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  lastPage!: number;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.load();
  }

  load(page = 1): void {
    this.productService.all(page).subscribe((result) => {
      this.products = result.data;
      this.lastPage = result.meta.lastPage;
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.productService.delete(id).subscribe(() => {
        this.products = this.products.filter((product) => product.id !== id);
      });
    }
  }
}
