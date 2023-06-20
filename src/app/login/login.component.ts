import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';
import { isError } from 'util';
import { signup } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authError:string='';
  loginform = new FormGroup({
    password: new FormControl(''),
    username: new FormControl('')
  });
  submitted = false;
  alert: boolean | undefined;

  constructor(private router: Router, private formBuilder: FormBuilder, private seller: SellerService) { }

  ngOnInit(): void {
    this.seller.reloadSeller()
    this.loginform = this.formBuilder.group(
      {
        username: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)]],
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]],
      });

  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }
  onSubmit(data:signup): void {
    this.submitted = true;

    if (this.loginform.invalid) {
      return;
    }
    console.warn(this.loginform.value);
    this.seller.userLogin(this.loginform.value)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
          this.authError="Email or password is not correct";
      }
      else{
        this.alert = true 
      }
      

    })
    this.loginform.reset({})
    this.submitted = false;
    this.loginform.reset();
  }
  closeAlert() {
    this.alert = false
  }
  onReset(): void {
    this.submitted = false;
    this.loginform.reset();
  }
  gotoregister() {
    this.router.navigate(['/seller-auth'])
  }

}
