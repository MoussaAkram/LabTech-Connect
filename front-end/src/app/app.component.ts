import {Component} from '@angular/core';
import { NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'front-end';
  currentRoute: any;
  currentId: any;
  arrayPath: any | undefined;


  constructor(private router: Router, private appService : AppService) {

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
        this.arrayPath = event.url.split('/')
        this.currentId = this.arrayPath[2]?.substr(1, this.arrayPath[2].length - 1);
        this.appService.currentRoute = event.url;
        console.log('here'+this.appService.currentRoute)
        if (event.url.startsWith('/home/:')){
          this.currentRoute = '/home/:';

        }
        else if(event.url.startsWith('/page1/:')){
          this.currentRoute = '/page1/:';

        } else if(event.url.startsWith('/vision/:')){
          this.currentRoute = '/vision/:';

        }
        else{
          this.currentRoute = event.url
        }
      });
  }

logOut(){
    this.appService.doLogout()
}

}
