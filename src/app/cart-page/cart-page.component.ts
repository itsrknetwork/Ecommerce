import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary, product } from '../data-type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined
  items: cart[] = []
  userId: any;
  CID: any;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private product: ProductService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.product.getCartId(this.userId).subscribe((data) => {
        this.CID = data;
        console.warn(this.CID)
      });
    }
    else {
      this.product.currentCart().subscribe(data => {
        this.cartData = data;
        console.warn("cartData", this.cartData)
        let price = 0;
        data.forEach((item) => {
          if (item.quantity) {
            price = price + (+item.price * item.quantity)
          }

        })
        this.priceSummary.price = price;
        this.priceSummary.discount = price / 10;
        this.priceSummary.tax = price / 10;
        this.priceSummary.delivery = 100;
        this.priceSummary.total = price + 100;
        console.warn(this.priceSummary)
      });
    }



  }
  checkout() {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/user-auth'])
    } else {
      this.router.navigate(['/checkout'])
    }

  }
}
