import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  userData: any;
  wishlistData: any; 
  wishlistLength:number = 0;
  wishlistStatus: string='Wishlist Empty!';
  rowContent: any;
  totalAmount: any=0.0;
  constructor(private route:Router,private sanitizer:DomSanitizer,public productService:ProductService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.userData = JSON.parse(localStorage.getItem('imepress_userdata'));
    if(this.userData){
      this.getWishlistDetails();
    }
    
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  getWishlistDetails(){
    if(this.userData){
      this.productService.getWishlistDetails({'user_id':this.userData.id}).subscribe(res=>{
        if(res['status']=='success'){
          this.wishlistLength = res['data'].length;
          if(this.wishlistLength>0){
            this.wishlistData = res['data'];
            this.wishlistCount(this.wishlistData);
            this.productService.setWishlistInfo(this.wishlistLength);
          }else{
            this.wishlistData = null;
            this.wishlistLength = 0;
            this.totalAmount = 0;
            this.productService.setWishlistInfo(this.wishlistLength);
            this.wishlistStatus = "Wishlist Empty!"
          }
         
        }
      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Guest User !',
        text: 'Guest Wishlist is under Development. Please Login!',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  transform(base64) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }

  removeProductToWishlist(data){
    if(this.userData){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          let object = {
            id : data.id,
            user_id : this.userData.id
          }
          this.productService.deleteSingleWishlistRecord(object).subscribe(res=>{
            if(res['status']=='success'){
              this.wishlistLength = res['data'].length;
              if(this.wishlistLength>0){
                this.wishlistData = res['data'];
                this.wishlistCount(this.wishlistData);
                this.productService.setWishlistInfo(this.wishlistLength);
              }else{
                this.wishlistData = null;
                this.wishlistLength = 0;
                this.totalAmount = 0;
                this.productService.setWishlistInfo(this.wishlistLength);
                this.wishlistStatus = "Wishlist Empty!"
              }
            }
          })
          Swal.fire(
            'Deleted!',
            'Product Deleted !.',
            'success'
          )
        }
      })
    }
  }

  getCartId(data) {
    this.rowContent = data;
  }

  moveToCart() {
    if (this.userData) {
      if (this.rowContent) {
        let object = {
          product_id: this.rowContent.product_id,
          wishlist_id: this.rowContent.id,
          user_id: this.userData.id
        }
        this.productService.moveWishlistToCart(object).subscribe(res => {
          if (res['status'] == 'success') {
            this.wishlistLength = res['data'].length;
            if (this.wishlistLength > 0) {
              this.wishlistData = res['data'];
              this.wishlistCount(this.wishlistData);
              this.productService.setWishlistInfo(this.wishlistLength);
              this.productService.setCartInfo(res['cart'].length);
            
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cart',
                text: 'Product Added to Cart !',
                showConfirmButton: false,
                timer: 2000
              })
            } else {
              this.wishlistLength = 0;
              this.totalAmount = 0;
              this.productService.setWishlistInfo(0);
              if (res['cart'].length > 0) {
                this.productService.setCartInfo(res['cart'].length);
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cart',
                  text: 'Product Added to Cart !',
                  showConfirmButton: false,
                  timer: 2000
                })
              } else {
                this.totalAmount =0;
                this.productService.setWishlistInfo(0);
              }

              this.wishlistData = null;
              this.wishlistStatus = 'Wishlist Is Empty !'
            }
          } else if (res['status'] == 'warning') {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Cart',
              text: 'Product Already in the Cart !',
              showConfirmButton: false,
              timer: 2000
            })
          }
        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Cart',
          text: 'Please Select Product !',
          showConfirmButton: false,
          timer: 2000
        })
      }
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

  wishlistCount(data){
    this.totalAmount = this.productService.calWishlistTotal(data);
  }

  removeAllWishlistItems(){
    if(this.userData){
      let object = {
        user_id : this.userData.id
      }
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteAllWishlistRecords(object).subscribe(res=>{
            if(res['status']=='success'){
              this.productService.setWishlistInfo(0);
              this.wishlistLength = 0;
              this.totalAmount = 0;
            }
          })
          Swal.fire(
            'Deleted!',
            'All Products Deleted !',
            'success'
          )
        }
      })
    
    }else{
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

  backToCart(){
    if(this.userData){
      this.route.navigate(['/cart']);
    }else{
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


}
