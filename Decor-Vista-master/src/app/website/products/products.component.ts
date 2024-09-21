import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[];
  _products: Product[];

  selectedImage: string = '';

  categories: any = [];

  constructor(private productService: ProductService, private router: Router) { }

  filter() {
    let selected = false;

    let result = [];

    for (let product of this._products) {
      if (this.categories[product.category.name].isSelected) {
        selected = true;
        result.push(product);
      }
    }

    if (!selected) {
      this.products = this._products;
    }
    else {
      this.products = result;
    }
  }

  ngOnInit(): void {
    this.productService.all().subscribe((p) => {
      this.products = p;
      this._products = p;

      for (let product of p) {
        if (this.categories[product.category.name] == null) {
          this.categories[product.category.name] = {
            count: 1,
            isSelected: false,
          };
        }
        else {
          this.categories[product.category.name].count++;
        }
      }

      this.filter();
    });
  }

  addToCart(productId: number) {
    this.productService.addToCart(productId, this.products)
      .subscribe(() => {
        this.router.navigate(['cart']);
      });
  }

  openModal(imageSrc: string) {
  }
}
