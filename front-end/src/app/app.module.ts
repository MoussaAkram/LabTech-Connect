import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { NavComponent} from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SectionComponent } from './components/section/section.component';
import {Page1Component} from "./components/page/page1.component";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import { AddHomeComponent } from './components/add-home/add-home.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './components/login/login.component';
import {ToastrModule} from 'ngx-toastr';
import { RegisterComponent } from './components/register/register.component';
import { TableUserComponent } from './components/table-user/table-user.component'
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Page1Component,
    NavComponent,
    FooterComponent,
    SectionComponent,
    HomeComponent,
    AddHomeComponent,
    LoginComponent,
    RegisterComponent,
    TableUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatIconModule,
    MatBadgeModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatButtonToggleModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
