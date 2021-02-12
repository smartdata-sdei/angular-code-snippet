import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url:string = environment.backendUrl;
  public brandDetails = new ReplaySubject<any>();
  public cartDetails = new ReplaySubject<any>();
  public wishlistDetails  = new ReplaySubject<any>();
  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get(this.url+'/api/customer/product/getCategories');
  }

  getProduct(data){
    return this.http.get(this.url+'/api/customer/product/getProduct/'+data.id);
  }

  getAllProducts(){
    return this.http.get(this.url+'/api/customer/product/getAllProducts');
  }

  getSearchProducts(data){
    return this.http.get(this.url+'/api/customer/product/getSearchProducts',{params: { keyword: data } });
  }
  
  getFilterProducts(data){
    return this.http.post(this.url+'/api/cusomer/product/getFilterProducts',data);
  }
  getCategoriesProduct(data){
    return this.http.get(this.url+'/api/customer/product/getCategoriesProduct/'+data.catId);
  }

  getBrands(){
    return this.http.get(this.url+'/api/customer/product/getBrands');
  }

  getBrandDetails(data){
    return this.http.get(this.url+'/api/customer/product/getBrandsDetail/'+data.brandId);
  }

  getCategoryDetails(){
    return this.http.get(this.url+'/api/customer/product/getCategoryDetails');
  }

  getBannerImages(){
    return this.http.get(this.url+'/api/customer/product/getBannerProducts');
  }

  saveCartDetails(data){
    return this.http.post(this.url+'/api/customer/product/addToCart',data);
  }

  getCartDetails(data){
    return this.http.post(this.url+'/api/customer/product/getCartData',data);
  }

  deleteSingleCartRecord(data){
    return this.http.post(this.url+'/api/customer/product/deleteCart',data);
  }

  deleteSingleWishlistRecord(data){
    return this.http.post(this.url+'/api/customer/product/deleteWishlist',data);
  }

  deleteAllCartRecords(data){
    return this.http.post(this.url+'/api/customer/product/deleteCompleteCartRecords',data);
  }

  deleteAllWishlistRecords(data){
    return this.http.post(this.url+'/api/customer/product/deleteCompleteWishlistRecords',data);
  }

  moveCartToWishlist(data){
    return this.http.post(this.url+'/api/customer/product/moveCartDataToWishlist',data);
  }

  moveWishlistToCart(data){
    return this.http.post(this.url+'/api/customer/product/moveWishlistDataToCart',data);
  }

  manageCartQuantity(data){
    return this.http.post(this.url+'/api/customer/product/manageCartQuantity',data);
  }

  getWishlistDetails(data){
    return this.http.post(this.url+'/api/customer/product/getWishlist',data);
  }

  addProductToWishlist(data){
    return this.http.post(this.url+'/api/customer/product/addToWishlist',data);
  }

  getBrandInfo(){
    return this.brandDetails.asObservable();
  }

  setBrandInfo(value){
    this.brandDetails.next(value);
  }

  getCartInfo(){
    return this.cartDetails.asObservable();
  }

  setCartInfo(value){
    this.cartDetails.next(value);
  }

  getWishlistInfo(){
    return this.wishlistDetails.asObservable();
  }

  setWishlistInfo(value){
    this.wishlistDetails.next(value);
  }

  calculateTotalPrice(price,quantity){
    return price * quantity;
  }

  calculateAmount(data){
    let totalAmount= 0.0;
    data.forEach(element => {
      totalAmount = totalAmount + (element.products.price)*(element.quantity) 
    });

    return totalAmount;
  }

  calWishlistTotal(data){
    let totalAmount = 0.0;
    data.forEach(element => {
      totalAmount = totalAmount + (element.products.price) * 1 
    });

    return totalAmount;
  }
}
