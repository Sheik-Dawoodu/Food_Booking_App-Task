import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// Generate component
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { MaterialRoutingModule } from './modules/material/material-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelsComponent } from './components/hotels/hotels.component';
import { FoodListComponent } from './components/food-list/food-list.component';

// Angular Meterials

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { DialogComponent } from './components/dialog/dialog.component';
import { FoodMatDialogComponent } from './components/food-mat-dialog/food-mat-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartComponent } from './components/cart/cart.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    HotelsComponent,
    FoodListComponent,
    NavBarComponent,
    DialogComponent,
    FoodMatDialogComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} } 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
