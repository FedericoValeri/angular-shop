import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './products/product-list/product-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductCreateComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
