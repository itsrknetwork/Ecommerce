import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult:undefined|product[];
  constructor(private activeRoute:ActivatedRoute, private product:ProductService, private route:Router) { }

  ngOnInit(): void {
    let query=this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query)
   query && this.product.searchProducts(query).subscribe((result)=>{
    this.searchResult=result
    console.warn(result)
   })
  }

}
