import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { AppCMS } from './appCMS'
import {environment} from "../environments/environment.development";
import {Vision} from "./vision";
import {Admin} from "./admin";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppService {
private apiUrl = environment.BaseUrl
  public role: string | undefined;

  public currentRoute : string | undefined;

  data : any;

  constructor(private http : HttpClient , public router: Router) {
  }


  getAdmin() : Observable<Admin[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}` // Include the token in the request headers
    });
    const url = `${this.apiUrl}/get`
    return this.http.get<Admin[]>(url, { headers: headers })
  }


  getAdminById(id: number | undefined): Observable<Admin> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}` // Include the token in the request headers
    });
    const url = `${this.apiUrl}/get/${id}`
    return this.http.get<Admin>(url, { headers: headers })
  }

  deleteAdmin(id:number | undefined) : Observable<Admin> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}` // Include the token in the request headers
    });
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<Admin>(url, { headers: headers });
  }

  updateAdmin(user: Admin | undefined): Observable<Admin> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}` // Include the token in the request headers
    });
    const url = `${this.apiUrl}/update/${user?._id}`;
    return this.http.put<Admin>(url, user, { headers: headers });
  }

  addAdmin(user: Admin | undefined): Observable<Admin> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}` // Include the token in the request headers
    });
    const url = `${this.apiUrl}/post`;
    return this.http.post<Admin>(url, user, { headers: headers });
  }
  loginAdmin(user: Admin | undefined): Observable<Admin> {
    const url = `${this.apiUrl}/post/login`;
    return this.http.post<Admin>(url, user);
  }



  getToken() {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return authToken !== null;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('token');
    if (removeToken == null) {
      this.router.navigate(['']);
    }
  }



  getAll() : Observable<AppCMS[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}` // Include the token in the request headers
    });
  const url = `${this.apiUrl}/container/get`
  return this.http.get<AppCMS[]>(url, { headers: headers })
  }

  getById(id:number | undefined) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}` // Include the token in the request headers
    });
    const url = `${this.apiUrl}/container/id/${id}`
    return this.http.get(url, { headers: headers })
  }

  deleteCMS(id:number | undefined) : Observable<AppCMS> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}` // Include the token in the request headers
    });
    const url = `${this.apiUrl}/container/delete/id/${id}`;
    return this.http.delete<AppCMS>(url, { headers: headers });
  }

  updateCMS(cms: AppCMS | undefined): Observable<AppCMS> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}` // Include the token in the request headers
    });
    const url = `${this.apiUrl}/container/update/id/${cms?._id}`;
    return this.http.put<AppCMS>(url, cms, { headers: headers });
  }

  addCMS(cms: AppCMS | undefined): Observable<AppCMS> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}` // Include the token in the request headers
    });
    const url = `${this.apiUrl}/container/post`;
    return this.http.post<AppCMS>(url, cms, { headers: headers });
  }

  getVision() : Observable<Vision[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}` // Include the token in the request headers
    });
    const url = `${this.apiUrl}/vision/get`
    return this.http.get<Vision[]>(url, { headers: headers })
  }

  getVisionById(id:number | undefined) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}` // Include the token in the request headers
    });
    const url = `${this.apiUrl}/vision/${id}`
    return this.http.get(url, { headers: headers })
  }

  deleteVision(id:number | undefined) : Observable<Vision> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}` // Include the token in the request headers
    });
    const url = `${this.apiUrl}/vision/delete/${id}`;
    return this.http.delete<Vision>(url, { headers: headers });
  }

  updateVision(dash: Vision | undefined): Observable<Vision> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}` // Include the token in the request headers
    });
    const url = `${this.apiUrl}/vision/update/${dash?._id}`;
    return this.http.put<Vision>(url, dash, { headers: headers }).pipe(
      catchError((error) => {
        console.log(error); // Log the error message to the console
        throw error; // Rethrow the error to propagate it to the calling code
      })
    );
  }

  addVision(dash: Vision | undefined): Observable<Vision> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}` // Include the token in the request headers
    });
    const url = `${this.apiUrl}/vision/post`;
    return this.http.post<Vision>(url, dash, { headers: headers }).pipe(
      catchError((error) => {
        console.log(error); // Log the error message to the console
        throw error; // Rethrow the error to propagate it to the calling code
      })
    );
  }

}
