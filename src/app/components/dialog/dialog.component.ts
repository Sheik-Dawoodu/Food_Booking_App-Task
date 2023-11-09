import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ViewApiService } from 'src/app/services/view-api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  hotelFormField: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private service: ViewApiService,
    private dilogRef: DialogRef<DialogComponent>,
    private notification: ToastrService
  ) {
    this.hotelFormField = this._fb.group({
      hotel_name: new FormControl('', [Validators.required]),
      hotel_address: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {}
  onclick() {
    if (this.hotelFormField.valid) {
      console.log('form field', this.hotelFormField);
      this.service.postHotelsdata(this.hotelFormField.value).subscribe({
        next: (res: any) => {
          this.notification.success(res.message);
          this.dilogRef.close();
          this.hotelFormField.reset();
        },
        error: () => {
          console.log(Error);
          this.notification.error('Some one else');
        },
      });
    }
  }
}
