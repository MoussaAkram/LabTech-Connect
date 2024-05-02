import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {Component, Input, OnInit} from '@angular/core';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})

export class SectionComponent   implements OnInit {
  routeSubscription: Subscription | undefined;
  str: string | undefined;
  id: any | undefined;

  appCMS :any | undefined  ;
  @Input() public pageId: any='';
  constructor(private appService : AppService, private route: ActivatedRoute) {
  }



  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
        this.str = params['id'];
        console.log(this.str?.substr(1, this.str.length - 1))
        this.id = this.str?.substr(1, this.str.length - 1);
        this.appService.getById(this.id).subscribe((response) => {
          this.appCMS = response; // log the response data to the console
        });
      }
    )
  }
}
