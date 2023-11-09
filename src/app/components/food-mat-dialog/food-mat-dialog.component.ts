import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ViewApiService } from 'src/app/services/view-api.service';
import { Input } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-food-mat-dialog',
  templateUrl: './food-mat-dialog.component.html',
  styleUrls: ['./food-mat-dialog.component.css'],
})
export class FoodMatDialogComponent implements OnInit {
  transferData!: string;
  foodForm: FormGroup;
  foodId: string = '';

  constructor(
    private service: ViewApiService,
    private _fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private dilogRef: DialogRef<FoodMatDialogComponent>,
    private notification: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { transferData: string }
  ) {
    this.foodForm = this._fb.group({
      food_name: new FormControl('', [Validators.required]),
      food_price: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    console.log(this.data);
    this.transferData = this.data['transferData'];
    this.activatedRoute.params.subscribe((params) => {
      console.log('params', params);
      if (params && params['id']) {
        this.foodId = params['id'];
        console.log('this.foodId', this.foodId);
      }
    });
  }

  onclick() {
    if (this.foodForm.valid) {
      console.log(this.transferData);

      // let id = this.activatroute.snapshot.paramMap.get('id');
      console.log(this.foodForm.value);
      this.service.postFood(this.transferData, this.foodForm.value).subscribe({
        next: (res: any) => {
          this.notification.success(res.message);
          this.dilogRef.close();
          this.foodForm.reset();
          this.onclick()
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
