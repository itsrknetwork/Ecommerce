import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  alert: boolean | undefined;
 productList:undefined | product[]
  constructor(private product:ProductService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.list();
    }
  closeAlert()
  {
    this.alert=false
  }
deleteProduct(id:number){
  console.warn(id)
  this.product.deleteProduct(id).subscribe((result)=>{
    if(result){
      this.alert=true 
      this.list();
    }
  })
}
list(){
  this.product.productList().subscribe((result)=>{
    console.warn(result)
    if(result){
      this.productList=result;
    }
  })
}
}
