import { Component, OnInit } from '@angular/core';
import { cart, order } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  userId:any;
  cartData: cart[]|undefined;


  constructor(private product:ProductService,private router:Router) { }
  totalPrice:number|undefined
  ngOnInit(): void {
       this.product.currentCart().subscribe(data=>{
        this.cartData=data;
         let price=0;
         data.forEach((item)=>{
           if(item.quantity){
             price=price+(+item.price*item.quantity)
           }
          
         })
        
         this.totalPrice=price+100;
         console.warn(this.totalPrice)
        });
     
  
}
goToPayments(data:order){
  let userStore = localStorage.getItem('user');
  let parseuser;
  parseuser = userStore && JSON.parse(userStore);
  this.userId = parseuser[0].id;
if(this.totalPrice){
  let orderData:order={
    ...data,
    totalPrice:this.totalPrice,
    userId:this.userId,
    id:undefined
  }
  this.product.orderData(orderData).subscribe((result)=>{
    this.router.navigate(['/payment'])
    console.warn(result)
  })
}
 

  }

}