import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  formGroup: FormGroup;
  hide: boolean = true;
  loading: boolean = false;
  error: string = '';
  constructor(private service: AuthenticationService, private notification:ToastrService) {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
     // authondicate user not allowed to login page 
     this.service.canAuthondicate()
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  loginProcess() {
    this.loading = true;
    if (this.formGroup.valid) {
      this.service.login(this.formGroup.value).subscribe({
        next: (res) => {
          this.service.storeToken(res.idToken)
          this.notification.success(res.message)
          this.service.canAuthondicate()
          console.log(res, 'login res');
        },
        error:()=>{
          this.notification.error("the username and password you have entered is incorrect")
        }
      }).add(()=>{
        this.loading=false
        console.log('log in process completed');
        
      })
    }
  }
}
