import { Component, OnInit} from '@angular/core';
import {AppCMS} from "../../appCMS";
import {AppService} from "../../app.service";
import {repeat} from "rxjs";
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import {Admin} from "../../admin";

@Component({
  selector: 'app-add-home',
  templateUrl: './add-home.component.html',
  styleUrls: ['./add-home.component.css']
})
export class AddHomeComponent implements OnInit{
  boolShowModel = false;
  boolShowDeleteModel = false;
  addForm : any = {};
  idDeleteModel : any ;
  updateForm : any = {};
  idUpdate : any;
  boolshowUpdateModel = false;
  private addFormData: any;
  file:any = {}
  selectedFile: any;
  speciality:  string = 'Informatique';
  contenents:  string = 'professeur de Faculté des sciences et techniques de Tanger';
  searchText: string = '';

  items: AppCMS[] = []; // Your table data

  showModel(){
    this.boolShowModel = !this.boolShowModel
}
  showDeleteModel(id?: number | undefined){
    this.idDeleteModel = id
    this.boolShowDeleteModel = !this.boolShowDeleteModel
  }
  showUpdateModel(cms ?: AppCMS | undefined){
    this.idUpdate = cms?._id
    this.updateForm._id = cms?._id
    this.updateForm.name = cms?.name
    this.updateForm.speciality = cms?.speciality
    this.updateForm.contenants = cms?.contenants
    this.updateForm.image = cms?.image
    this.boolshowUpdateModel = !this.boolshowUpdateModel
  }
  changeUpdateForm(event : any | undefined){
    if(event.target.id == 'titre-input-Update'){
      this.updateForm.name = event.target.value
    }
    else if (event.target.id == 'contenants-input-update') {
      this.updateForm.contenants = event.target.value
    }
    else if (event.target.id == 'speciality-input-Update') {
      this.updateForm.speciality = event.target.value
    }
    else {
      this.updateForm.image = event.target.value
    }
  }

  appCMS : AppCMS[] | undefined = [] ;

  constructor(private appService : AppService, private router : Router) {
    this.fetchAdminData();
  }


  ngOnInit() {
    const role = this.appService.role;
    this.appService.getAll().subscribe((appCMS) =>this.appCMS = appCMS)


  }
  addCMS(addFormData : NgForm){
    this.addForm.speciality = this.speciality;
    this.addForm.contenants = this.contenents;
      this.appService.addCMS(this.addForm).subscribe();
      this.appService.getAll().subscribe((appCMS) =>this.appCMS = appCMS)
      this.boolShowModel = false
      addFormData.reset()
    setTimeout(() =>{
      this.appService.getAll().subscribe((appCMS : any) =>{
        this.appCMS = appCMS
      })
      repeat();
    }, 1000);
  }
  deleteCMS(id : number | undefined){
    this.appService.deleteCMS(id).subscribe()
    this.appService.getAll().subscribe((appCMS) =>this.appCMS = appCMS)
    this.boolShowDeleteModel = false
    setTimeout(() =>{
      this.appService.getAll().subscribe((appCMS : any) =>{
        this.appCMS = appCMS
      })
      repeat();
    }, 1000);
  }

  updateCMS(){
    this.appService.updateCMS(this.updateForm).subscribe()
    this.boolshowUpdateModel = false
    setTimeout(() =>{
      this.appService.getAll().subscribe((appCMS : any) =>{
        this.appCMS = appCMS
      })
      repeat();
    }, 1500);
  }


  onFileUpdate(event : any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      if (reader.result !== null) {

          const base64String = reader.result.toString().split(',')[1];
          this.updateForm.image = base64String;
          console.log(base64String);

      }
    };
  }
  searchBar(): void {
    if (this.appCMS && this.appCMS.length > 0) {
      if (this.searchText) {
        this.appCMS = this.appCMS.filter((cms ) => {
          // Modify the condition based on your search requirements
          return  cms.email && cms.email.toLowerCase().includes(this.searchText.toLowerCase()) || cms.name && cms.name.toLowerCase().includes(this.searchText.toLowerCase());
        });
      } else {
        this.appCMS = [...this.appCMS];
        this.appService.getAll().subscribe((appCMS) => {
          this.appCMS = appCMS;
          this.items = appCMS;
        });
      }
    } else {
      this.appCMS = [];
      this.appService.getAll().subscribe((appCMS) => {
        this.appCMS = appCMS;
        this.items = appCMS;
      });
    }


  }

  fetchAdminData(): void {
    this.appService.getAll().subscribe((appCMS) => {
      this.appCMS = appCMS;
      this.items = appCMS;
      this.searchBar();
    });
  }

}
