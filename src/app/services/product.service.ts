import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  userId:any;
  cartData = new EventEmitter<product[] | []>();
  url = "http://localhost:3000/products";
  urls="http://localhost:3000/cart";

  constructor(private http: HttpClient) { }
  addProduct(data: product) {
    console.warn("service is called")
    return this.http.post('http://localhost:3000/products', data);
  }
  productList() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProduct(id: string) {
    return this.http.get<product>(this.url + "/" + id);
  }
  updateProduct(product: product) {
    return this.http.put<product>(this.url + "/" + product.id, product);
  }
  popularProducts() {
    return this.http.get<product[]>("http://localhost:3000/products?_limit=5");
  }
  trendryProducts() {
    return this.http.get<product[]>("http://localhost:3000/products?_limit=8");
  }
  searchProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }
  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartData.emit(items);
      console.warn("items", cartData)
    }
  }
  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData)
  }
  getCartList(userId: number) {
    return this.http.get<product[]>('http://localhost:3000/cart?userId='+userId, {
      observe: 'response'
    }).subscribe((result) => {
      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    })
  }
  removeFromCart(cartId: number) {
    
    console.warn(cartId)
    return this.http.delete('http://localhost:3000/cart/' + cartId);

  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    //let userData = userStore && JSON.parse(userStore)
    let parseuser;
    parseuser = userStore && JSON.parse(userStore);
    this.userId = parseuser[0].id;
    console.warn("userId=",this.userId)
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+this.userId)
    
  }
  getCartId(cartId:number){
    return this.http.get('http://localhost:3000/cart/')
  }
  orderData(data:order){
    return this.http.post('http://localhost:3000/orders',data);
  }
  orderList(){
    let userStore = localStorage.getItem('user');
    //let userData = userStore && JSON.parse(userStore)
    let parseuser;
    parseuser = userStore && JSON.parse(userStore);
    this.userId = parseuser[0].id;
    console.warn("userId=",this.userId)
    return this.http.get<order[]>('http://localhost:3000/orders?userId='+this.userId)
    
  }

}
