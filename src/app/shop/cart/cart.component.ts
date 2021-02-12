import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userData: any;
  cartDetails: any;
  public cartLength: number = 0;
  public cartStatus: string;
  public rowContent: any;
  totalAmount: any=0.0;
  constructor(private route:Router,private sanitizer: DomSanitizer, public productService: ProductService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.userData = JSON.parse(localStorage.getItem('imepress_userdata'));
    if (this.userData) {
      this.getCartInformation();
    } else {
      this.cartStatus = 'Cart Is Empty !'
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  transform(base64) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }

  getCartInformation() {
    this.productService.getCartDetails({ user_id: this.userData.id }).subscribe(res => {
      if (res['status'] == 'success') {
        this.cartLength = res['data'].length;
        if (this.cartLength > 0) {
          this.cartDetails = res['data'];
          this.getTotalAmount(this.cartDetails);
          this.productService.setCartInfo(this.cartLength);
        } else {
          this.cartLength = 0;
          this.totalAmount = 0;
          this.cartStatus = 'Cart Is Empty !'
        }
      } else {

      }
    })
  }

  incQuantity(data) {
    if (this.userData) {
      let object = {
        id: data.id,
        type: 'increment'
      }
      this.productService.manageCartQuantity(object).subscribe(res => {
        if (res['status'] == 'success') {
          this.cartLength = res['data'].length;
          if (this.cartLength > 0) {
            this.cartDetails = res['data'];
            this.getTotalAmount(this.cartDetails);
          } else {
            this.cartLength = 0;
            this.totalAmount = 0;
          }
        }
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Guest User !',
        text: 'Please Login First !',
        showConfirmButton: false,
        timer: 2000
      })
    }

  }

  decQuantity(data) {
    if (this.userData) {
      if (data.quantity != '1') {
        let object = {
          id: data.id,
          type: 'decrement'
        }
        this.productService.manageCartQuantity(object).subscribe(res => {
          if (res['status'] == 'success') {
            this.cartLength = res['data'].length;
            if (this.cartLength > 0) {
              this.cartDetails = res['data'];
              this.getTotalAmount(this.cartDetails);
            } else {
              this.cartLength = 0;
              this.totalAmount = 0;
            }
          }
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

  removeProductToCart(data) {
    if (this.userData) {
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
            id: data.id,
            user_id: this.userData.id
          }
          this.productService.deleteSingleCartRecord(object).subscribe(res => {
            if (res['status'] == 'success') {
              this.cartLength = res['data'].length;
              if (this.cartLength > 0) {
                this.cartDetails = res['data'];
                this.getTotalAmount(this.cartDetails);
                this.productService.setCartInfo(this.cartLength);
              } else {
                this.cartLength = 0;
                this.totalAmount = 0;
                this.productService.setCartInfo(this.cartLength);
                this.cartDetails = null;
                this.cartStatus = 'Cart Is Empty !'
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

  moveToWishlist() {
    if (this.userData) {
      if (this.rowContent) {
        let object = {
          product_id: this.rowContent.product_id,
          cart_id: this.rowContent.id,
          user_id: this.userData.id
        }
        this.productService.moveCartToWishlist(object).subscribe(res => {
          if (res['status'] == 'success') {
            this.cartLength = res['data'].length;
            if (this.cartLength > 0) {
              this.cartDetails = res['data'];
              this.getTotalAmount(this.cartDetails);
              this.productService.setCartInfo(this.cartLength);
              this.productService.setWishlistInfo(res['wishlist'].length);
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cart',
                text: 'Product Added to Wishlist !',
                showConfirmButton: false,
                timer: 2000
              })
            } else {
              this.cartLength = 0;
              this.totalAmount = 0;
              this.productService.setCartInfo(0);
              if (res['wishlist'].length > 0) {
                this.productService.setWishlistInfo(res['wishlist'].length);
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Cart',
                  text: 'Product Added to Wishlist !',
                  showConfirmButton: false,
                  timer: 2000
                })
              } else {
                this.productService.setWishlistInfo(0);
              }

              this.cartDetails = null;
              this.cartStatus = 'Cart Is Empty !'
            }
          } else if (res['status'] == 'warning') {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Cart',
              text: 'Product Already in the Wishlist !',
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

  getTotalAmount(data){
     this.totalAmount = this.productService.calculateAmount(data);
  }

  goToCheckout(){
    if(this.userData){
      this.route.navigate(['/user/checkout']);
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

  removeAllCartItems(){
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
          this.productService.deleteAllCartRecords(object).subscribe(res=>{
            if(res['status']=='success'){
              this.productService.setCartInfo(0);
              this.cartLength = 0;
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

}
