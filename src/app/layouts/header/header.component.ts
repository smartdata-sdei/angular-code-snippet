import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'src/app/service/app.service';
import { AuthService } from 'src/app/service/auth.service';
import { ProductService } from 'src/app/service/product.service';
import { ValidatorList } from 'src/app/validation/validator.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public account_validation_messages = ValidatorList.account_validation_messages;
  public loginForm: FormGroup;
  public forgotPasswordForm: FormGroup;
  public registrationForm: FormGroup;
  public userData: any;
  public categories: any;
  public brands: any;
  public loginStatus: boolean = false;
  public passwordNotMatchError: boolean = false;
  public cartLength: number = 0;
  public wishlistLength: number = 0;

  keyword = new FormControl();

  constructor(private sanitizer: DomSanitizer, private appService: AppService, private productService: ProductService, private route: Router, private authService: AuthService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.spinner.show();
    this.appService.maintainStatus();
    this.userData = JSON.parse(localStorage.getItem('imepress_userdata'));

    if (this.userData) {
      this.loginStatus = true;
      this.getCartCount();
      this.getWishlistCount();
      this.authService.setLoggedInStatus(true);
    } else {
      this.loginStatus = false;
      this.authService.setLoggedInStatus(false);
    }
    this.getCategories();

    this.getBrands();

    this.authService.getUserData().subscribe(res => {
      this.userData = res;
    })

    this.productService.getCartInfo().subscribe(res => {
      if (res > 0) {
        this.cartLength = res;
      } else {
        this.cartLength = 0;
      }
    })

    this.productService.getWishlistInfo().subscribe(res => {
      if (res > 0) {
        this.wishlistLength = res;
      } else {
        this.wishlistLength = 0;
      }
    })


    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_!#$%&'*+/=? \\\"`{|}~^.-]+@[a-zA-Z0-9.-]+$")]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[a-zA-Z0-9@ -']+")]]
    })

    this.registrationForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_!#$%&'*+/=? \\\"`{|}~^.-]+@[a-zA-Z0-9.-]+$")]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[a-zA-Z0-9@ -']+")]],
      confirm_password: ["", [Validators.pattern("^[a-zA-Z0-9@ -']+"), Validators.minLength(6)]],
      mobile_number: ["", [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    })

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_!#$%&'*+/=? \\\"`{|}~^.-]+@[a-zA-Z0-9.-]+$")]]
    })


    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }



  /**
  * Function to Validate form fields (loginForm)
  * @param formGroup
  **/
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  /**
* Function to Validate form fields (Registration Form)
* @param formGroup
**/
  validateAllFormField(formGroup: FormGroup) {
    Object.keys(this.registrationForm.controls).forEach(field => {
      const control = this.registrationForm.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  validateForgotPasswordFields(formGroup: FormGroup) {
    Object.keys(this.forgotPasswordForm.controls).forEach(field => {
      const control = this.forgotPasswordForm.get(field);
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }

  /**
   * function to remove white spaces
   * @param event
   */
  checkWhiteSpace(event: any) {
    event.target.value = event.target.value.trim();
    if (this.registrationForm.value.password != this.registrationForm.value.confirm_password) {
      this.passwordNotMatchError = true;
      return;
    } else {
      this.passwordNotMatchError = false;
      return;
    }
  }

  /**
   * function to submit login details
   * 
  **/

  loginSubmit() {
    if (this.loginForm.valid == false) {
      this.validateAllFormFields(this.loginForm.value);
      return;
    }
    document.getElementById('closeLoginModel').click();
    this.authService.loginCustomer(this.loginForm.value).subscribe(response => {
      if (response['status'] == 'success') {
        this.loginStatus = true;
        this.loginForm.reset();
        localStorage.setItem('imepress_token', response['token']);
        localStorage.setItem('imepress_userdata', JSON.stringify(response['user']));
        this.userData = response['user'];
        this.authService.seUserData(response['user']);
        this.authService.setLoggedInStatus(true);
        this.getCartCount();
        this.getWishlistCount();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Successfully',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        this.loginForm.reset();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }
    }, (error) => {
      this.loginForm.reset();
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Unauthorized User !',
        text: 'Please check for different credentials',
        showConfirmButton: false,
        timer: 2000
      })
    })


  }

  registrationFormSubmit() {
    if (this.registrationForm.valid == false) {
      this.validateAllFormField(this.registrationForm.value);
      return;
    }
    document.getElementById('closeRegistrationFormModel').click();
    this.authService.userRegistration(this.registrationForm.value).subscribe(response => {
      if (response['status'] == 'success') {
        this.registrationForm.reset();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registration Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.route.navigate(['']);
      } else {
        this.registrationForm.reset();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }
    }, (error) => {
      this.registrationForm.reset();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    })
  }

  forgotPassword() {
    if (this.forgotPasswordForm.valid == false) {
      this.validateForgotPasswordFields(this.forgotPasswordForm.value);
      return;
    }
    document.getElementById('closeForgotPasswordForm').click();
    this.registrationForm.reset();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Password is sent to your Email Addresss. Please check your Email Address ! ',
      showConfirmButton: false,
      timer: 2000
    })

  }

  logoutUser() {
    this.spinner.show();
    this.cartLength = 0;
    this.wishlistLength = 0;
    this.authService.setLoggedInStatus(false);
    localStorage.removeItem('imepress_token');
    localStorage.removeItem('imepress_userdata');
    this.loginStatus = false;
    this.route.navigate(['']);
    document.getElementById('closeLoginModel').click();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }

  getCategories() {
    this.productService.getCategories().subscribe(res => {
      if (res['status'] == 'success') {
        this.categories = res['data'];
        console.log(this.categories);
      } else {
        this.categories = null;
      }
    }, (error) => {

    })
  }

  getBrands() {
    this.productService.getBrands().subscribe(res => {
      if (res['status'] == 'success') {
        this.brands = res['data'];
        this.productService.setBrandInfo(this.brands);
      } else {
        this.brands = null;
      }
    }, (error) => {

    })
  }

  transform(base64) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }

  moveToBrandDetail(id) {
    console.log('id', id);
    document.getElementById("dropdownSeller").classList.remove("show");
    this.route.navigate(['/seller/list/' + id]);
  }

  moveToCategoryDetail(id) {
    document.getElementById("dropdownCategory").classList.remove("show");
    this.route.navigate(['/category/list/' + id]);
  }

  getCartCount() {
    this.userData = JSON.parse(localStorage.getItem('imepress_userdata'));
    if (this.userData) {
      let object = {
        user_id: this.userData.id
      }
      this.productService.getCartDetails(object).subscribe(res => {
        if (res['status'] == 'success') {
          this.cartLength = res['data'].length;
          this.productService.setCartInfo(this.cartLength);
        } else {
          this.cartLength = 0;
        }
      }, (error) => {

      })
    }

  }


  search() {
    if (this.keyword.value != '') {
      this.route.navigate(['/product/list/' + this.keyword.value]);
    }
  }

  getWishlistCount() {
    this.userData = JSON.parse(localStorage.getItem('imepress_userdata'));
    if (this.userData) {
      let object = {
        user_id: this.userData.id
      }
      this.productService.getWishlistDetails(object).subscribe(res => {
        if (res['status'] == 'success') {
          this.wishlistLength = res['data'].length;
          this.productService.setWishlistInfo(this.wishlistLength);
        } else {
          this.cartLength = 0;
        }
      }, (error) => {

      })
    }
  }
}
