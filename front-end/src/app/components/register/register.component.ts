import {Component, OnInit} from '@angular/core';
import {AppCMS} from "../../appCMS";
import {AppService} from "../../app.service";
import {NgForm} from "@angular/forms";
import {repeat} from "rxjs";
import {Admin} from "../../admin";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  boolShowModel = false;
  addForm : any = {};
  selectedRole:  string = 'basic';
  admin : Admin[] | undefined = [] ;
  showModel(){
    this.boolShowModel = !this.boolShowModel
  }
  constructor(private appService : AppService) {
  }
  addAdmin(addFormData : NgForm){

    this.addForm.role = this.selectedRole;
    this.appService.addAdmin(this.addForm).subscribe();
    this.boolShowModel = false
    addFormData.reset()
    setTimeout(() =>{

      repeat();
    }, 1000);
  }

  ngOnInit(): void {
  }





}
