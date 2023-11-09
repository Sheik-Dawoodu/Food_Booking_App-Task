import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    public service: AuthenticationService,
    public cartService: CartService,
    private notification: ToastrService
  ) {}

  public totalFoodlist: number = 0;
  ngOnInit(): void {
    this.cartService.getFoods().subscribe((res) => {
      this.totalFoodlist = res.length;
    });
  }
  logout() {
    this.service.removeuser();
    this.service.canAccess();
    this.notification.info('Thank You!!');
  }
}
