import { Component,OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
public food:any=[]
public grandTotal!:number
constructor(private cardServices:CartService){}
ngOnInit(): void {
  this.cardServices.getFoods().subscribe(res=>{
    this.food=res
    this.grandTotal=this.cardServices.getTotalPrice()
  })
}
removeItem(hotels:any){
this.cardServices.removeCart(hotels)
}
emtyCart(){
  this.cardServices.removeAllItem()
}
}
