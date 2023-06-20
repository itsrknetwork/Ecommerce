import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  alert: boolean | undefined;
  submitted=false;
  productData:undefined | product
  productMessage: string | undefined;
  constructor(private  route:ActivatedRoute,private product:ProductService) { }

  ngOnInit(): void {
    let productId=this.route.snapshot.paramMap.get('id')
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.warn(data);
      this.productData=data;
    })
  }
  submit(data:product){

    this.submitted=true;
    this.alert=true;
    console.warn(data)
    if(this.productData){
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage="Product has been updated"
      }
    })
    setTimeout(()=>{
      this.productMessage=undefined;
    },3000);
    
  }
  closeAlert()
  {
    this.alert=false
  }

}
