import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {repeat, Subscription} from "rxjs";
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
})

 export class Page1Component  implements OnInit  {
  routeSubscription: Subscription | undefined;
  str: string | undefined;
  idItem: any | undefined;

 vision :any | undefined  ;

   constructor(private appService : AppService, private route: ActivatedRoute) {
   }



ngOnInit() {


    this.routeSubscription = this.route.params.subscribe(params => {
        this.str = params['idItem'];
        console.log(this.str?.substr(1, this.str.length - 1))

        this.idItem = this.str?.substr(1, this.str.length - 1);
        console.log( this.idItem)
        this.appService.getVisionById(this.idItem).subscribe((response) => {
          this.vision = response; // log the response data to the console

        });
      }
    )
  setTimeout(() =>{
    console.log(this.vision);
    repeat();
  }, 1000);
  }
  // update(){
  //   this.appService.getVisionById(this.idItem).subscribe((response) => {
  //     this.vision = response; // log the response data to the console
  //   });
  // }

}
