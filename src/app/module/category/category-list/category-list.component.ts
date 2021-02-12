import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/service/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  catId: any;
  getCategoryProductDetails: any;
  backendUrl = environment.backendUrl;
  constructor(private sanitizer: DomSanitizer, private productService: ProductService, private spinner: NgxSpinnerService, private route: ActivatedRoute) {
    this.route.params.subscribe(catId => {
      this.catId = catId;
      this.getCategoriesProduct(this.catId);
    })
   }

  ngOnInit(): void {
    this.spinner.show();
    this.getCategoriesProduct(this.catId);

    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  getCategoriesProduct(catId) {
    this.productService.getCategoriesProduct(catId).subscribe(res => {
      if (res['status'] == 'success') {
        this.getCategoryProductDetails = res['data'];
      } else {
        this.getCategoryProductDetails = null;
      }
    })
  }

  transform(base64) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }

}
