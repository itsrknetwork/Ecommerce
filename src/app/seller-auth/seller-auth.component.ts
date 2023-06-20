import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators, AbstractControl} from '@angular/forms'
import { Router } from '@angular/router';

import Validation from 'src/validators/passwordMatch';
import { signup } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  SignUpForm=new FormGroup({
    email:new FormControl(''),
    fullname: new FormControl(''),
    username: new FormControl(''),
    password:new FormControl(''),
    confirmPassword: new FormControl('')
  });
  data:any
  submitted = false;
  alert: boolean | undefined;
  constructor(private router:Router, private formBuilder: FormBuilder, private seller:SellerService) { }

  ngOnInit(): void {
   this.seller.reloadSeller()
    this.SignUpForm = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: ['',[
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.SignUpForm.controls;
  
  }
  onSubmit(data:signup): void {
    this.submitted = true;
    
    if (this.SignUpForm.invalid) {
      return;
    }
    console.warn(this.SignUpForm.value)
    this.seller.userSignUp(this.SignUpForm.value)
      
    this.alert=true
    this.SignUpForm.reset({})
    this.submitted = false;
    this.SignUpForm.reset();
  
  }
  
  onReset(): void {
    this.submitted = false;
    this.SignUpForm.reset();
  }
closeAlert()
  {
    this.alert=false
  }
  goTologin(){
    this.router.navigate(['/login'])
   }

}
