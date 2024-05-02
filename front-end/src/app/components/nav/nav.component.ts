import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from "../../app.service";
import {repeat, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AppCMS} from "../../appCMS";
import {NgForm} from "@angular/forms";
import {Vision} from "../../vision";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

// @Output() onUpdate = new EventEmitter()

  @Input() public pageId: any='';
  containersId : Vision | undefined;
  boolShowDashboard = false;
  boolShowModel = false;
  boolShowAddModel = false;
  boolShowAllModel = false;
  boolShowAllUpdateModel = false;
  id: any | undefined;
  appCMS : AppCMS | undefined  ;
  addForm : any = {};
  vision : Vision[] | undefined = [] ;
  visions : any  ;
  boolShowDeleteModel = false;
  idDeleteModel : any ;
  updateForm : any = {};
  idUpdate : any;
  boolshowUpdateModel = false;
  file:any = {}
  selectedFile: any;
  idUpdateCMS : any;
  updateFormCMS : any = {};
  boolshowUpdateModelCMS = false;
  appCMSs : AppCMS[] | undefined = [] ;

  constructor(private appService : AppService, private route: ActivatedRoute) {

  }

  showDashboard(){
    this.boolShowDashboard = !this.boolShowDashboard
  }
  showAddModel(){
    this.boolShowAddModel = !this.boolShowAddModel
  }
  showModel(){
    this.boolShowModel = !this.boolShowModel
  }
  showAllUpdateModel(){
    this.boolShowAllUpdateModel = !this.boolShowAllUpdateModel
  }
  showAllModel(){
    this.boolShowAllModel = !this.boolShowAllModel
  }
  showDeleteModel(id?: number | undefined){
    this.idDeleteModel = id
    this.boolShowDeleteModel = !this.boolShowDeleteModel
    this.boolShowAllModel = !this.boolShowAllModel
    this.boolShowModel = !this.boolShowModel
  }
  showUpdateModel(dash ?: Vision | undefined){
    this.idUpdate = dash?._id
    this.updateForm._id = dash?._id
    this.updateForm.containersId = dash?.containersId
    this.updateForm.item = dash?.item
    this.updateForm.titre = dash?.titre
    this.updateForm.contenants = dash?.contenants
    this.updateForm.fileImage = dash?.fileImage
    this.updateForm.fileVideo = dash?.fileVideo
    this.boolshowUpdateModel = !this.boolshowUpdateModel
    this.boolShowAllUpdateModel = !this.boolShowAllUpdateModel
    this.boolShowModel = !this.boolShowModel

  }
  changeUpdateForm(event : any | undefined){
    if(event.target.id == 'titre-input-Update'){
      this.updateForm.titre = event.target.value
    }
    else if (event.target.id == 'item-input-Update'){
      this.updateForm.item = event.target.value
    }
    else if (event.target.id == 'contenants-input-update'){
      this.updateForm.contenants = event.target.value
    }
   //  else if(event.target.id == 'file_update_input'){
   // this.onFileUpdate(event);
   //  }
   //  else {
   //    this.onFileVideoUpdate(event);
   //  }
     else {
      this.onFileUpdate(event);
     }
  }
  ngOnInit() {


        this.appService.getById(this.pageId).subscribe((response) => {
          this.appCMS = response; // log the response data to the console

        });

    setTimeout(() =>{
      console.log(this.appCMS);
      repeat();
    }, 1000);

  }
  onFileUpdate(event : any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      if (reader.result !== null) {
        if (event.target.id == 'file_update_input') {
          const base64String = reader.result.toString().split(',')[1];
          this.updateForm.fileImage = base64String;
          console.log(base64String);
        } else {
          const base64String = reader.result.toString().split(',')[1];
          this.updateForm.fileVideo = base64String;
          console.log(base64String);
        }
      }
    };
  }

  // onFileVideoUpdate(event : any){
  //   this.selectedFile = event.target.files[0];
  //   console.log(this.selectedFile)
  //   const reader = new FileReader();
  //   reader.readAsDataURL(this.selectedFile);
  //   reader.onload = () => {
  //     if (reader.result !== null) {
  //       const base64String = reader.result.toString().split(',')[1];
  //       this.updateForm.fileVideo = base64String;
  //       console.log(base64String);}
  //   };
  // }
  onFileSelected(event :any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      if (reader.result !== null) {
        if (event.target.id == 'fileImage_input') {
      const base64String = reader.result.toString().split(',')[1];
        this.addForm.fileImage = base64String;
      console.log(base64String);
        } else {
          const base64String = reader.result.toString().split(',')[1];
          this.addForm.fileVideo = base64String;
          console.log(base64String);
        }
      }
    };

  }
  // onFileVideoSelected(event :any) {
  //   this.selectedFile = event.target.files[0];
  //   console.log(this.selectedFile)
  //   const reader = new FileReader();
  //   reader.readAsDataURL(this.selectedFile);
  //   reader.onload = () => {
  //     if (reader.result !== null) {
  //       const base64String = reader.result.toString().split(',')[1];
  //       this.addForm.fileVideo = base64String;
  //       console.log(base64String);
  //     }
  //   };
  //
  // }
  addVision(addFormData : NgForm){
    this.addForm.containersId = this.pageId;
    this.addForm.email = this.appCMS?.email
    console.log("ni" + this.addForm.email)
    // this.addForm.file = this.selectedFile.name
    this.appService.addVision(this.addForm).subscribe((response) => {
      this.visions = response; // log the response data to the console
      console.log( "hi" +this.visions )
    });
    console.log(this.addForm.fileImage)
    this.boolShowModel = false
    addFormData.reset()
    setTimeout(() =>{
      this.appService.getById(this.pageId).subscribe((response) => {
        this.appCMS = response; // log the response data to the console
        console.log( "here" +this.appCMS )
      });
      repeat();
    }, 1000);
  }
  deleteVision(id : number | undefined){
    this.appService.deleteVision(id).subscribe()
    this.boolShowDeleteModel = false
    setTimeout(() =>{
      this.appService.getById(this.pageId).subscribe((response) => {
        this.appCMS = response; // log the response data to the console

      });
      repeat();
    }, 1000);
  }
  updateVision() {
    // this.onUpdate.emit()
    this.appService.updateVision(this.updateForm).subscribe()
    this.boolshowUpdateModel = false
    setTimeout(() => {
      this.appService.getById(this.pageId).subscribe((response) => {
        this.appCMS = response; // log the response data to the console

      });
      // this.appService.getVision().subscribe((vision : any) =>{
      //   this.vision = vision
      // })
      //
      // this.onUpdate.emit(this.vision)
      repeat();
    }, 1000);

  }

    onItemClick(event: MouseEvent) {
    event.preventDefault();
    const links = document.querySelectorAll('nav div');
    const clickedLink = event.currentTarget as HTMLElement;
    if (clickedLink.classList.contains('bg-gray-900')) {
      clickedLink.classList.remove('bg-gray-900');
      clickedLink.classList.remove('text-white');
    } else {
      links.forEach((link) => {
        link.classList.remove('bg-gray-900');
        link.classList.remove('text-white');
      });
      clickedLink.classList.add('bg-gray-900');
      clickedLink.classList.add('text-white');
    }
  }
  logOut(){
    this.appService.doLogout()
  }
  showUpdateModelCMS(cms ?: AppCMS | undefined){
    this.appService.getById(this.pageId).subscribe((response : AppCMS) => {
      this.idUpdateCMS= response._id;
      this.updateFormCMS._id = response._id;
      this.updateFormCMS.name = response.name
      this.updateFormCMS.speciality = response.speciality
      this.updateFormCMS.contenants = response.contenants
      this.updateFormCMS.image = response?.image
      // console.log('nii'+ this.idUpdateCMS)
      // console.log('noo'+  this.updateFormCMS.image)
      // console.log('naa'+ this.updateFormCMS.name)
      // console.log('looo'+ this.updateFormCMS.contenants)
      // console.log('hi' + this.pageId)
      // console.log('hello' + cms?._id)
      // console.log('roo'+ cms?.name)
      // console.log('riii'+ cms?.contenants)

    });
    this.boolshowUpdateModelCMS = !this.boolshowUpdateModelCMS
    this.boolShowModel = !this.boolShowModel
    // this.idUpdateCMS = this.pageId;
    // this.updateFormCMS._id = this.pageId
    // this.updateFormCMS.name = this.pageId?.name
    // this.updateFormCMS.contenants = cms?.contenants
    // this.updateFormCMS.image = cms?.image
    // this.boolshowUpdateModelCMS = !this.boolshowUpdateModelCMS
    // this.boolShowModel = !this.boolShowModel
    // console.log('nii'+ this.idUpdateCMS)
    // console.log('noo'+  this.updateFormCMS._id)
    // console.log('naa'+ this.updateFormCMS.name)
    // console.log('looo'+ this.updateFormCMS.contenants)
    // console.log('hi' + this.pageId)
    // console.log('hello' + cms?._id)
    // console.log('roo'+ cms?.name)
    // console.log('riii'+ cms?.contenants)

  }
  changeUpdateFormCMS(event : any | undefined){
    if(event.target.id == 'titre-Update'){
      this.updateFormCMS.name = event.target.value
    }
    else if (event.target.id == 'contenants-update') {
      this.updateFormCMS.contenants = event.target.value
    }
    else if (event.target.id == 'speciality-Update') {
      this.updateFormCMS.speciality = event.target.value
    }
    else {
      this.updateFormCMS.image = event.target.value
    }
  }
  updateCMS(){
    this.updateFormCMS._id = this.pageId;
    this.appService.updateCMS(this.updateFormCMS).subscribe()
    this.boolshowUpdateModelCMS = false
    setTimeout(() =>{

      repeat();
    }, 1000);
  }


  onFileUpdateCMS(event : any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      if (reader.result !== null) {

        const base64String = reader.result.toString().split(',')[1];
        this.updateFormCMS.image = base64String;
        console.log(base64String);

      }
    };
  }

}



