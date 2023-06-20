import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { product } from '../data-type';
import { cart } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: any;
  cartDataId:any;
  userId: any;
  
  constructor(private activeRoute: ActivatedRoute, private product: ProductService, private router:Router) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn("productId=", productId)
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result;
      let cartData = localStorage.getItem('localCart')
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => productId === item.id.toString())
        console.warn("item", items);
        console.warn(cartData)
        if (items.length) {
          this.removeCart = true;
          console.warn(this.removeCart)
        } else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let parseuser;
        parseuser = user && JSON.parse(user);
        let userId = parseuser[0].id;
        this.product.getCartList(userId)
        this.product.cartData.subscribe((result) => {
          let item = result.filter((item: product) => productId?.toString() === item.productId?.toString)
          if (item.length) {
            this.cartData=item[0];
            this.removeCart = true;
          }
        })
      }
    })
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData)
        this.removeCart = true;
        console.warn(this.productData)
        console.warn('user not logged')
      } else {
        // let user=localStorage.getItem('user');
        //let  parseuser;
        //parseuser= user && JSON.parse(user);
        // let userId=parseuser[0].id;   
        //  console.warn(userId);  
        let user = localStorage.getItem('user');
        let parseuser;
        parseuser = user && JSON.parse(user);
        this.userId = parseuser[0].id;
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId: this.userId,
      
          
        }
        console.warn(this.productData.id)
        this.cartData=cartData;
       this.cartDataId=cartData.id;
       delete cartData.id;
          console.warn(cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(this.userId);
            this.removeCart = true;
            alert("product is added in cart")
          }
        })

      }
    }
  }


  removeFromCart(productId: number) {
    
    if (!localStorage.getItem('user')) {
      console.warn("ok  44")
      this.product.removeItemFromCart(productId)
    } else {
      console.warn("cartData",this.cartData)
      console.warn(this.cartDataId)
      this.cartData && this.product.removeFromCart(this.cartDataId).subscribe((result) => {
        this.product.getCartList(this.userId)
        console.warn(this.userId)
      })
    }
    this.removeCart = false;
  }
  goToCheckout(){
    this.router.navigate(['/checkout'])
  }
  
}
