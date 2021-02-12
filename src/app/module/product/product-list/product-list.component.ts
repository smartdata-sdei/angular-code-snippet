import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { empty } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any=[];
  keyword: any=null;

  constructor(private sanitizer: DomSanitizer,private spinner: NgxSpinnerService, private productService:ProductService, private route:ActivatedRoute) {
    this.route.params.subscribe(search=>{
      console.log(search);
      if(typeof search.keyword === 'string'){
       this.keyword = search.keyword;
       this.getSearchProducts(this.keyword);
      }
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    
    if(this.keyword != null){
      this.getSearchProducts(this.keyword);
    }else{
      this.getAllProducts();
    }
    
    
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(res=>{
      console.log(res);
      if(res['status'] == 'success'){
        this.products = res['data'];

      }
    },(error)=>{

    })
  }

  getSearchProducts(data){
    this.productService.getSearchProducts(data).subscribe(res=>{
      console.log(res);
      if(res['status'] == 'success'){
        this.products = res['data'];
      }
    },(error)=>{

    })
  }

  getFilterProducts(data){
    this.productService.getFilterProducts(data).subscribe(res=>{
      console.log(res);
      if(res['status'] == 'success'){
        this.products = res['data'];
      }
    },(error)=>{

    })
  }

  transform(base64) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }

}
