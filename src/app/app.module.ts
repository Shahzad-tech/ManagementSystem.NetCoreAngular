import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorService } from './Services/token-interceptor.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';





@NgModule({
  declarations: [
     AppComponent,

  ],
  imports: [
  HttpClientModule,
  BrowserAnimationsModule,
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
    
  ],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
 }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
