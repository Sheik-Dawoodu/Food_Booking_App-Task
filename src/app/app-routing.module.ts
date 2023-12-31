import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { AuthenticationService } from './services/authentication.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FoodMatDialogComponent } from './components/food-mat-dialog/food-mat-dialog.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LogInComponent },
  { path: 'hotels', component: HotelsComponent }, //canActivate:[AuthenticationService]
  { path: 'foods/:id', component: FoodListComponent },
  { path: 'cart', component: CartComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
