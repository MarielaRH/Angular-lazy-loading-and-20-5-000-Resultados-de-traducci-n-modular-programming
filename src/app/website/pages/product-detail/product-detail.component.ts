import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {

     this.route.paramMap
    .pipe(
      switchMap(params => {
         this.productId = params.get('id');
        if(this.productId){
          return this.productsService.getOne(this.productId);
        }else{
          return [null];
        }
      })
    )
    .subscribe(data => {
      this.product = data;
    });
  }
 
  gotToBack(){
    this.location.back();
  }
}
