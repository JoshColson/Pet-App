import { Component, OnInit } from '@angular/core';
import { NavigationModule } from '../../Logic/Navigation';
import { SharedMethodsModule } from '../../Logic/SharedMethods';
import { PageName } from '../../Data/AppEnums';

@Component({
  selector: 'landing-page',
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.css', '../../../generalStyles.css']
})
export class LandingPage implements OnInit {
  constructor(public nav: NavigationModule,
    private methods: SharedMethodsModule,
  )
  {

  }
  accentAccessibility = this.methods.ReturnAccentAccessibilityChoices();
  accessibility = this.methods.ReturnAccessibilityChoices();
  ngOnInit() {
    if (!this.methods.ReturnContainsKey())
    this.methods.CreateNewSession();
  }


  EnterBtn() {
    this.nav.Navigate(PageName.Home);
  }

}
