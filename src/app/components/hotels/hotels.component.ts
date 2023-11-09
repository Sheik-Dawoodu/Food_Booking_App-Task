import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ViewApiService } from 'src/app/services/view-api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

interface CardItem {
  title: string;
  content: string;
  imageUrl: string;
}
@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
})
export class HotelsComponent implements OnInit {
  gettinghotellist: any;
  id: any;
  sub: any;
  constructor(
    private service: ViewApiService,
    private auth: AuthenticationService,
    public dialog: MatDialog,
    private _Activatedroute: ActivatedRoute,
    private router: Router
  ) {}

  openDialog() {
    this.dialog.open(DialogComponent);
  }

  ngOnInit(): void {
    this.auth.canAccess();
    this.getHotelList();
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
  }

  getHotelList() {
    //hotel api get method
    this.service.getHotelsdata().subscribe({
      next: (res: any) => {
        console.log(res);
        this.gettinghotellist = res.data;
      },
      error: console.log,
    });
  }
}
