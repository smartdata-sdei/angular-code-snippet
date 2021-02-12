import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HomeBannerComponent implements OnInit {

  responsiveOptions;
  public products :any = [];
  public backendUrl = environment.backendUrl;
  bannerImageCount: number = 0;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.backendUrl = environment.backendUrl;
    this.getBannerImage();
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 1,
          numScroll: 1
      } 
  ];
}

  getBannerImage(){
    this.productService.getBannerImages().subscribe(res=>{
      if(res['status']=='success'){
        this.bannerImageCount = res['data'].length;
        if(this.bannerImageCount>0){
          this.products = res['data'];
        }
      }else{
        this.bannerImageCount = 0;
      }
    },(error)=>{
      
    })
  }

}
