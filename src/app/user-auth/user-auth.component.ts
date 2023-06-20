import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import Validation from 'src/validators/passwordMatch';
import { cart, login, product, signup } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin:boolean=true;
  authError:string="";
  userId:any;

  loginForm=new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
  });

  SignUpForm=new FormGroup({
    email:new FormControl(''),
    fullname: new FormControl(''),
    password:new FormControl(''),
    confirmPassword: new FormControl('')
  });
  data:any |undefined;
  submitted = false;
  alert: boolean | undefined;
  constructor(private router:Router, private formBuilder: FormBuilder, private user:UserService, private product:ProductService) { }

  ngOnInit(): void {
    this.user.userAuthReload();

    this.SignUpForm = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
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
  onSubmit(user:signup): void {
    this.submitted = true;
    
    if (this.SignUpForm.invalid) {
      return console.warn(this.SignUpForm.value,"invalid entries");
    }
    console.warn(this.SignUpForm.value)
    this.user.userSignUp(this.SignUpForm.value)
      
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
  goToSignup(data:signup){
    this.showLogin=false;
    this.router.navigate(['/user-auth'])
    this.localCartToRemoteCart();
  }
  goTologin(){
    this.showLogin=true;
    this.router.navigate(['#'])
   }
   userSignIn(data:login){
    this.user.userLogin(data);
    this.user.isLoginError.subscribe((data)=>{
      console.warn(data);
      if(data){
        this.authError="Email or password is not correct";
      }else{
        this.localCartToRemoteCart();
      }
    })

   }
   localCartToRemoteCart(){
    let data=localStorage.getItem('localCart');
    if(data){
      console.warn("called")
      let cartDataList:product[]=JSON.parse(data);
      let user=localStorage.getItem('user');
         let  parseuser;
         parseuser= user && JSON.parse(user);
          this.userId=parseuser[0].id;   
        console.warn(this.userId);
      cartDataList.forEach((product:product,index) => {
        let cartData:cart={
          ...product,
          productId:product.id,
          userId:this.userId
        } 
        console.warn(cartData.userId)
        delete cartData.id;
       setTimeout(()=>{
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            console.warn("data is stored in DB")
          }
        })
       },500);
       if(cartDataList.length===index+1){
        localStorage.removeItem('localCart')
       }
      });
      console.warn(user)
    }
    setTimeout(() =>{
      this.product.getCartList(this.userId)
    },2000);
  
   }

}
