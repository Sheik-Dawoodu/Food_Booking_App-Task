import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formGroup: any = FormGroup;
  formdata = { username: '', email: '', password: '' };
  hide: boolean = true;

  constructor(
    private service: AuthenticationService,
    private router: Router,
    private _fb: FormBuilder,
    private notification: ToastrService
  ) {}
  ngOnInit(): void {
    this.formGroup = this._fb.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    // authondicate user not allowed to register page
    this.service.canAuthondicate();
  }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  register() {
    if (this.formGroup.valid) {
      this.service.register(this.formGroup.value).subscribe({
        next: (res) => {
          this.service.storeToken(res.idToken);
          console.log('Register id Token', res.idToken);
          this.service.canAuthondicate();
          this.notification.success(res.message);
        },
        error: (err) => {
          console.log(err);
          this.notification.warning('All ready You Have Account ');
        },
      });
    }
  }
}
