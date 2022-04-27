import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryId: string | null = null;
  products: Product[] = [];
  limit = 10;
  offset = 0;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
         this.categoryId = params.get('id');
        if(this.categoryId){
          return this.productsService.getByCategory(this.categoryId,this.limit, this.offset);
        }else{
          return [];
        }
      })
    )
    .subscribe(data => {
      this.products = data;
    });
  }

  onLoadMore() {
    this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
     });
  }

}
