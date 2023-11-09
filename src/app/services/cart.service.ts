import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public foodList = new BehaviorSubject<any>([]);
  constructor() {}
  getFoods() {
    return this.foodList.asObservable();
  }
  setFoodList(foods: any) {
    this.cartItemList.push(foods);
    this.foodList.next(foods);
  }
  addToCart(foods: any) {
    this.cartItemList.push(foods);
    this.foodList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }
  removeCart(food: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (food.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.foodList.next(this.cartItemList);
  }
  removeAllItem() {
    this.cartItemList = [];
    this.foodList.next(this.cartItemList);
  }
}
