import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home-top-suppliars',
  templateUrl: './home-top-suppliars.component.html',
  styleUrls: ['./home-top-suppliars.component.css']
})
export class HomeTopSuppliarsComponent implements OnInit {
  public brandDetails : any;
  constructor(private sanitizer:DomSanitizer,private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getBrandInfo().subscribe(res=>{
      this.brandDetails = res;
    })
  }

  transform(base64) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }

}
