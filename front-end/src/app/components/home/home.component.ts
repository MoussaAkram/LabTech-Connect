import {Component, Input, OnInit} from '@angular/core';
import {Vision} from "../../vision";
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";
import {repeat} from "rxjs";
import {AppCMS} from "../../appCMS";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  @Input() public pageId: any='';
  containersId : Vision | undefined;
  boolShowDashboard = false;
  id: any | undefined;
  appCMS : AppCMS | undefined  ;
  addForm : any = {};
  vision : Vision[] | undefined = [] ;

  constructor(private appService : AppService, private route: ActivatedRoute) {
  }

  showDashboard(){
    this.boolShowDashboard = !this.boolShowDashboard
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


}
