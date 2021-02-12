import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.css']
})
export class SellerListComponent implements OnInit {
  public brandId : any;
  getBrandData: any=[];
  brandProduct: any=[];
  productCount: number;
  constructor(private sanitizer: DomSanitizer,private productService:ProductService,private spinner:NgxSpinnerService,private route: ActivatedRoute) {
    this.route.params.subscribe(catId => {
      this.brandId = catId;
      this.getBrandDetails(this.brandId);
    })
   }

  ngOnInit(): void {
    this.spinner.show();
    this.getBrandDetails(this.brandId);
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  getBrandDetails(brandId){
    this.productService.getBrandDetails(brandId).subscribe(res=>{
      if(res['status']=='success'){
        this.getBrandData = res['data'];
        this.productCount = res['data']['products'].length;
        if(this.productCount>0){
          this.brandProduct = res['data']['products'];
        }else{
          this.brandProduct = null;
          this.productCount = 0;
        }
      }else{
        this.getBrandData = null;
      }
    },(error)=>{

    })
  }

  transform(base64) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }

}
