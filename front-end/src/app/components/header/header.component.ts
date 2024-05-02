import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  shouldShowHeader(): boolean {
    const currentPath = this.router.url;
    // Specify the path(s) where the header should be hidden
    const hiddenPaths = ['/'];
    return !hiddenPaths.includes(currentPath);
  }

}
