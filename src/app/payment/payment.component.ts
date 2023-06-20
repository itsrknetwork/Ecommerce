import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { cart, order } from '../data-type';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  data:any;
  alert: boolean | undefined;

  constructor(private product:ProductService,private router:Router) { }
  totalPrice:number|undefined
  cartData: cart[]|undefined
  cashOnDelivery:boolean=false;
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
  payOption(){
    this.cashOnDelivery=true;
    console.warn("Your payment method is Cash ON Delivery ")
  
  }
  onSubmit(data:order){
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user);
    if(this.totalPrice){
      let orders:order={
        ...data,
        totalPrice:this.totalPrice,
        userId,
        
      }
      this.product.orderData(orders).subscribe((result)=>{
        console.warn(result)
      })
    }
    

   
    console.warn("your order is placed")
    this.alert=true;
    
    
  }
  closeAlert()
  {
    this.alert=false;
   
      this.router.navigate([''])
  }

}
