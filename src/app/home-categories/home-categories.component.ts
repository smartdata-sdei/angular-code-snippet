import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.css']
})
export class HomeCategoriesComponent implements OnInit {
  public homeCategoryDetails : any;
  constructor(private sanitizer:DomSanitizer,private productService:ProductService) { }

  ngOnInit(): void {
    this.getCategoryDetails();
  }

  getCategoryDetails(){
    this.productService.getCategoryDetails().subscribe(res=>{
      if(res['status']=='success'){
        this.homeCategoryDetails = res['data'];
      }else{
        this.homeCategoryDetails = null
      }
    },(error)=>{

    })
  }

  transform(base64) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }


}
