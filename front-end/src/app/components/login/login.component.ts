import {Component, Input, OnInit} from '@angular/core';
import {EMPTY, repeat, switchMap} from "rxjs";
import {AppService} from "../../app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AppCMS} from "../../appCMS";
import {Admin} from "../../admin";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  addForm : any = {};
  user : Admin[] | undefined = [] ;
  roleUser : Admin | undefined
  roleTest:any;
  private addFormData: any;
  private result: any;
  pageId = '6449416ff894897d4c407dd9';
  email: any
  password : any
  errorMessage : any

  constructor(private appService : AppService, private router: Router) {
    const token =  localStorage.getItem('token')
  }

  ngOnInit(): void {
  this.appService.doLogout()
  }

  loginUser() {
    this.appService.loginAdmin(this.addForm).pipe(
      switchMap((response) => {
        const roleUser = response.role;
        this.roleTest=response.role
        this.appService.role = this.roleTest;
        this.email = response.email
        this.password = response.password
        this.errorMessage = null; // Clear previous error message


        const userId = response._id;
        const token = response.token;
        console.log(token);
        console.log(userId); // Log the userId to verify its value
        if (roleUser === 'admin') {

          localStorage.setItem('token', token);
          this.router.navigateByUrl('/test');
          return EMPTY; // Return an empty observable to avoid further processing
        } else {
          localStorage.setItem('token', token);
          return this.appService.getAdminById(userId);
        }
      })
    ).subscribe(
      (userResponse) => {
        const admin: Admin = userResponse;
        console.log(admin.containers);
        if (admin && admin.containers && admin.containers.length > 0) {
          const appCMSId = admin.containers[0]._id;
          console.log(appCMSId);
          this.router.navigate(['/home', `:${appCMSId}`]);
        } else {
          console.error('No containers found for the admin');
        }
      },
      (error) => {
        console.error('Error occurred:', error);

          this.errorMessage = "Information not correct.";
          return; // Stop further execution

      }
    );
  }










        // console.log("User is logged in");
      // this.router.navigateByUrl('/test');

    // this.appService.getAdminById(this.roleUser?._id).subscribe((response) => {
    //   if (this.roleUser?.role == 'admin')
    //     this.router.navigateByUrl('/test');
    //   else {
    //     this.router.navigateByUrl('/home/:64494155f894897d4c407dd7');
    //   }
    // });


}
