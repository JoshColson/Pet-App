import { Component } from '@angular/core';
import { SharedMethodsModule } from './Logic/SharedMethods';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor(private methods: SharedMethodsModule) { this.accessibility = this.methods.ReturnAccessibilityChoices(); }
  accessibility:any;
}
