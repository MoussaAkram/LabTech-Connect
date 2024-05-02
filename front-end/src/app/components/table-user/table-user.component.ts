import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {Admin} from "../../admin";
import {repeat} from "rxjs";
import {AppCMS} from "../../appCMS";

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit{
  admin : Admin[] | undefined = [] ;
  items: Admin[] = []; // Your table data
  p: number = 1; // Current page number
  pageSize: number = 10; // Number of items per page
  searchText: string = '';
  idDeleteModel : any ;
  boolShowDeleteModel = false;
  updateForm : any = {};
  idUpdate : any;
  boolshowUpdateModel = false;

  showDeleteModel(id?: number | undefined){
    this.idDeleteModel = id
    this.boolShowDeleteModel = !this.boolShowDeleteModel
  }
  constructor(private appService : AppService) {
    this.fetchAdminData();

  }
  fetchAdminData(): void {
    this.appService.getAdmin().subscribe((admin) => {
      this.admin = admin;
      this.items = admin;
      this.searchBar();
    });
  }

  ngOnInit(): void {
    this.appService.getAdmin().subscribe((admin) => {
      this.admin = admin;
      this.items = admin;
    });
  }
  previousPage() {
    if (this.p > 1) {
      this.p--;
    }
  }

  nextPage() {
    const totalPages = this.getTotalPages();
    if (this.p < totalPages) {
      this.p++;
    }
  }

  getTotalPages() {
    return Math.ceil(this.items.length / this.pageSize);
  }


  searchBar(): void {
    if (this.admin && this.admin.length > 0) {
      if (this.searchText) {
        this.admin = this.admin.filter((user ) => {
          // Modify the condition based on your search requirements
          return  user.email && user.email.toLowerCase().includes(this.searchText.toLowerCase()) || user.name && user.name.toLowerCase().includes(this.searchText.toLowerCase());
        });
      } else {
        this.admin = [...this.admin];
        this.appService.getAdmin().subscribe((admin) => {
          this.admin = admin;
          this.items = admin;
        });
      }
    } else {
      this.admin = [];
      this.appService.getAdmin().subscribe((admin) => {
        this.admin = admin;
        this.items = admin;
      });
    }


  }

  // user ?: Admin | undefined
  showUpdateModel( id : number | undefined){
    this.idUpdate = id
    console.log('nii'+  this.idUpdate)
    this.appService.getAdminById(id).subscribe((response : Admin) => {
      this.updateForm._id = response?._id
      this.updateForm.name = response?.name
      this.updateForm.email = response?.email
      this.updateForm.password = response?.password
      this.updateForm.role = response?.role

      console.log('noo'+  this.updateForm._id )
      console.log('naa'+  this.updateForm.name)
      console.log('looo'+ this.updateForm.password )
      console.log('hi' + response?._id)
      console.log('hello' +  response?.name)
      console.log('roo'+ response?.password)


    });
    this.boolshowUpdateModel = !this.boolshowUpdateModel
  }

  changeUpdateForm(event : any | undefined){
    if(event.target.id == 'titre-input-Update'){
      this.updateForm.name = event.target.value
    }
    else {
      this.updateForm.password = event.target.value
    }
  }


  updateAdmin(){
    this.appService.updateAdmin(this.updateForm).subscribe()
    this.boolshowUpdateModel = false
    setTimeout(() =>{
      this.appService.getAdmin().subscribe((admin : any) =>{
        this.admin = admin
      })
      repeat();
    }, 1000);
  }

  deleteAdmin(id : number | undefined){
    this.appService.deleteAdmin(id).subscribe()
    this.appService.getAdmin().subscribe((admin) =>this.admin = admin)
    this.boolShowDeleteModel = false
    setTimeout(() =>{
      this.appService.getAdmin().subscribe((admin : any) =>{
        this.admin = admin
      })
      repeat();
    }, 1000);
  }






}
