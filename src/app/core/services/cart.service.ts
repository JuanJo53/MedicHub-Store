import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "src/app/shared/models/product";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  cart$ = this.cart.asObservable();

  constructor() {}

  addCart(product: Product) {
    this.products = [...this.products, product];
    this.cart.next(this.products);
    console.log(this.products);
  }
}