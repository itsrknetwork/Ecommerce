import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { login, signup } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError= new EventEmitter<boolean>(false)


  constructor(private http: HttpClient, private router:Router ) {}
  userSignUp(user:signup){
    console.warn(user);
    this.http.post('http://localhost:3000/users',user,{observe:'response'}).subscribe((result:any)=>{
      console.warn("user service called")
      if (result) {
        this.isUserLoggedIn.next(true)
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['/']);
      }
    })
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
  userLogin(data:login){
this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{
  observe: 'response'}).subscribe((result:any)=>{
    console.warn(result)
  if (result && result.body && result.body.length===1) {
      localStorage.setItem('user', JSON.stringify(result.body))
      this.router.navigate(['/']);
      this.isLoginError.emit(false);
    } else {
      console.warn("login failed")
      this.isLoginError.emit(true);
  }
})
}
}