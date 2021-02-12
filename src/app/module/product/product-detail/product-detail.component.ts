import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/service/app.service';
import { ProductService } from 'src/app/service/product.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public productId: any;
  public getProductData: any;
  public cartQuantity: number = 1;
  public userData: any;
  public url :any = environment.backendUrl;
  images: any[];
  responsiveOptions:any[] = [
  {
      breakpoint: '1024px',
      numVisible: 5
  },
  {
      breakpoint: '768px',
      numVisible: 3
  },
  {
      breakpoint: '560px',
      numVisible: 1
  }
];
  mainImage: any;
  constructor(private appService: AppService, private sanitizer: DomSanitizer, private productService: ProductService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
    this.spinner.show();
    this.appService.maintainStatus();
    this.userData = JSON.parse(localStorage.getItem('imepress_userdata'));
    this.route.params.subscribe(productId => {
      this.productId = productId;
    })

    this.getProductDetails(this.productId);

    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  getProductDetails(productId) {
    this.productService.getProduct(productId).subscribe(res => {
      if (res['status'] == 'success') {
        this.getProductData = res['data'];
        this.mainImage = this.setItemImage(this.getProductData.product_images[0].image);
        this.images = this.getProductData.product_images;
      } else {
        this.getProductData = null;
      }
    }, (error) => {

    })
  }

  transform(base64) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }

  cartIncrement() {
    this.cartQuantity = this.cartQuantity + 1;
  }

  cartDecrement() {
    if (this.cartQuantity != 1) {
      this.cartQuantity = this.cartQuantity - 1;
    }
  }

  addToCart() {
    this.userData = JSON.parse(localStorage.getItem('imepress_userdata'));
    if (this.userData) {
      let object = {
        product_id: this.getProductData.id,
        quantity: this.cartQuantity,
        user_id: this.userData.id
      }
      this.productService.saveCartDetails(object).subscribe(res => {
        if (res['status'] == 'success') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Product Added To Cart !',
            showConfirmButton: false,
            timer: 1500
          })
          this.productService.setCartInfo(res['data'].length);
        } else {
          this.productService.setCartInfo(0);
        }
      }, (error) => {

      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Guest User !',
        text: 'Please login First !',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  addToWishlist() {
    if (this.userData) {
      let object = {
        product_id: this.getProductData.id,
        user_id: this.userData.id
      }
      this.productService.addProductToWishlist(object).subscribe(res => {
        if (res['status'] == 'success') {
          this.productService.setWishlistInfo(res['data'].length);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Product Added to Wishlist !',
            showConfirmButton: false,
            timer: 1500
          })
        } else if (res['status'] == 'warning') {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Product Already in the Wishlist !',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          this.productService.setWishlistInfo(0);
        }
      }, (error) => {

      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Guest User !',
        text: 'Please login First !',
        showConfirmButton: false,
        timer: 2000
      })
    }

  }

  getUrl(imageUrl){
    return this.url+'/'+imageUrl;
  }

  setItemImage(imageUrl){
    this.mainImage = this.url+'/'+imageUrl;
    return this.mainImage;
  }
}
