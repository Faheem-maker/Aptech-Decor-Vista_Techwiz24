import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Category = {
    name: string
}

export type Product = {
    id: number,
    title: string,
    description: string,
    listPrice: number,
    SKU: string,
    category: Category,
    imageUrl: string,
};

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private http: HttpClient) {}
    all(): Observable<Product> {
        return this.http.get('/assets/products.json') as Observable<Product>;
    }

    addToCart(productId: number, products: Product[]): Observable<any> {
        // Add to Cart
        return of(0);
    }

    getCartProducts(): Observable<Product[]> {
        return this.http.get('/assets/cart.json') as Observable<Product>;
    }
}