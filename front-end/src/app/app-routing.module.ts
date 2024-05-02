import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Page1Component} from "./components/page/page1.component";
import {SectionComponent} from "./components/section/section.component";
import {AddHomeComponent} from "./components/add-home/add-home.component";
import {LoginComponent} from "./components/login/login.component";
import {GuardGuard} from "./guard.guard";
import {RegisterComponent} from "./components/register/register.component";
import {TableUserComponent} from "./components/table-user/table-user.component";
// , canActivate: [GuardGuard], data: { roles: ['admin'] },
// , canActivate: [GuardGuard], data: { roles: ['basic', 'admin'] },
const routes: Routes = [
  { path: 'home/:id', canActivate: [GuardGuard], data: { roles: ['basic', 'admin'] }, component: SectionComponent },
  { path: 'page1/:id/:idItem', canActivate: [GuardGuard], data: { roles: ['basic', 'admin'] }, component: Page1Component },
  { path: 'test', canActivate: [GuardGuard], data: { roles: ['admin'] },  component: AddHomeComponent },
  { path: 'vision/:id', canActivate: [GuardGuard], data: { roles: ['basic', 'admin'] }, component: SectionComponent },
  { path: 'vision/:id/:idItem', canActivate: [GuardGuard], data: { roles: ['basic', 'admin'] }, component: Page1Component },
  { path: 'register' , canActivate: [GuardGuard], data: { roles: ['admin'] }, component: TableUserComponent },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' , pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
