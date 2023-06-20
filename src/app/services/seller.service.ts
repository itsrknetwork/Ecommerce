import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login, signup } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError= new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: signup) {
    console.warn("service called")
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
      console.warn(result)
      if (result) {
        this.isSellerLoggedIn.next(true)
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }
    })
  }
  reloadSeller() {
    if (localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }
  userLogin(data:login) {
    this.http.get(`http://localhost:3000/seller?username=${data.username}&password=${data.password}`,
    {observe: 'response'}).subscribe((result:any)=>{
      console.warn(result)
    if (result && result.body && result.body.length===1) {
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      } else {
        console.warn("login failed")
        this.isLoginError.emit(true)
      }
     
    })

  }
}
