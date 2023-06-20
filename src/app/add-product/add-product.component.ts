import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  submitted=false;
  alert: boolean | undefined;
  productData:undefined | product

  constructor(private product:ProductService) { }

  ngOnInit(): void {
  }
submit(data:product)
{
  this.product.addProduct(data).subscribe((result:any)=>{
    console.warn(result)
    this.submitted=true;
    this.alert=true;
    
  })
}
onReset(): void {
  this.submitted = false;

}
closeAlert()
  {
    this.alert=false
  }
}
