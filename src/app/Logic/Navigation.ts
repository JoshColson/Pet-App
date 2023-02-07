import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { PageName } from '../Data/AppEnums';
import { SharedMethodsModule } from './SharedMethods';

@Injectable({
  providedIn: 'root'
})
export class NavigationModule {
  constructor(private router: Router, private methods: SharedMethodsModule) { }



  Navigate(url: PageName): void {
    this.router.navigateByUrl(url);
  }

  public NavigateWithParameter(url: PageName, param: any): void {
    const navigationExtras: NavigationExtras = {
      state: {
        customData: param
      }
    };
    this.router.navigateByUrl(url, navigationExtras);
  }

  PathToPageNameValue(path: string): PageName {

    return path.split("/").pop() as PageName
  }

  UrlProtect() {
    if (!this.methods.ReturnContainsKey()) {
      this.Navigate(PageName.LandingPage)
    }
  }

}
