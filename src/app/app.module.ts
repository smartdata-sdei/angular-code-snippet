import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeComponent } from './home/home.component';
import { HomeCategoriesComponent } from './home-categories/home-categories.component';
import { HomeAboutSectionComponent } from './home-about-section/home-about-section.component';
import { HomeOfferComponent } from './home-offer/home-offer.component';
import { HomeServicesComponent } from './home-services/home-services.component';
import { HomeTopSuppliarsComponent } from './home-top-suppliars/home-top-suppliars.component';
import {CarouselModule} from 'primeng/carousel';
import { ContactUsComponent } from './core/contact-us/contact-us.component';
import { CareersComponent } from './core/careers/careers.component';
import { AboutUsComponent } from './core/about-us/about-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MyInterceptor } from './interceptor/interceptor';
import { ErrorInterceptor } from './interceptor/error-interceptor';
import { ProductComponent } from './module/product/product.component';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { CategoryComponent } from './module/category/category.component';
import { SellerComponent } from './module/seller/seller.component';
import { PrivacyComponent } from './core/privacy/privacy.component';
import { TermsComponent } from './core/terms/terms.component';
import { UserComponent } from './module/user/user.component';
import { CartComponent } from './shop/cart/cart.component';
import { WishlistComponent } from './shop/wishlist/wishlist.component';
import { MyBiographyComponent } from './core/my-biography/my-biography.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeBannerComponent,
    HomeComponent,
    HomeCategoriesComponent,
    HomeAboutSectionComponent,
    HomeOfferComponent,
    HomeServicesComponent,
    HomeTopSuppliarsComponent,
    ContactUsComponent,
    CareersComponent,
    AboutUsComponent,
    ProductComponent,
    PageNotFoundComponent,
    CategoryComponent,
    SellerComponent,
    PrivacyComponent,
    TermsComponent,
    UserComponent,
    CartComponent,
    WishlistComponent,
    MyBiographyComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass :MyInterceptor,
      multi : true
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass :ErrorInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
