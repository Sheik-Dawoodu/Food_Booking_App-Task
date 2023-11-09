import { Component, Inject, OnInit } from '@angular/core';
import { ViewApiService } from 'src/app/services/view-api.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FoodMatDialogComponent } from '../food-mat-dialog/food-mat-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
})
export class FoodListComponent implements OnInit {
  public gettingFoodList: any; //Food Data
  public hotelId: string = '';

  constructor(
    private service: ViewApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public cartService: CartService
  ) {}
  openDialog() {
    const dialogRef = this.dialog.open(FoodMatDialogComponent, {
      data: { transferData: this.hotelId },
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.hotelId = params['id'];
    });
    this.getfoods();
    console.log('hotelid', this.hotelId);
  }
  value: number = 0;

  // increase(i:any) {
  //   console.log('index', i);
  //   this.value++;
  // }

  getfoods() {
    this.service.getFood(this.hotelId).subscribe({
      next: (res) => {
        this.gettingFoodList = res.data;
        console.log('get Food', res);
      },
      error: console.log,
    });
  }
  addToCart(food: any) {
    this.cartService.addToCart(food);
  }
}
