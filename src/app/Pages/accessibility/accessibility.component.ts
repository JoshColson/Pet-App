import { NavigationModule } from '../../Logic/Navigation';
import { Component, OnInit } from '@angular/core';
import { AccessibilityChoices } from '../../Data/Interfaces';
import { SharedMethodsModule } from '../../Logic/SharedMethods';
import {
  StorageDataLabels,
  PageName,
  FontOptions,
  FontColourOptions,
  FontColourClasses,
  BackgroundColourClasses,
  FontClasses,
  FontSizeOptions,
  FontSizeClasses,
  BackgroundColourOptions,
  AccentColourOptions,
  AccentColourClasses,
  ComponentOneColourOptions,
  ComponentOneColourClasses,
  ComponentTwoColourOptions,
  ComponentTwoColourClasses
  
} from '../../Data/AppEnums';

@Component({
  selector: 'accessibility-page',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.css', '../../../generalStyles.css']
})
export class AccessibilityPage implements OnInit {
  constructor(private nav: NavigationModule,
    private methods: SharedMethodsModule,
  ) {
  }
  ngOnInit() {
    if (this.accessibilityClasses) {
      this.newOptions = JSON.parse(JSON.stringify(this.accessibilityClasses));
    }
  }

  accessibilityClasses: AccessibilityChoices | undefined = this.methods.ReturnDataFromCookie(StorageDataLabels.AccessibilityOptions);
  accessibility = this.methods.ReturnAccessibilityChoices();
  accentAccessibility = this.methods.ReturnAccentAccessibilityChoices();

  fontColourClasses = FontColourClasses;
  fontClasses = FontClasses;
  fontSizeClasses = FontSizeClasses;
  backgroundColourClasses = BackgroundColourClasses;
  accentColourClasses = AccentColourClasses;
  componentOneColourClasses = ComponentOneColourClasses;
  componentTwoColourClasses = ComponentTwoColourClasses;

  newOptions: AccessibilityChoices = {};



  backgroundColourOptions = this.GetBackgroundColourOptions();
  fontOptions = this.GetFontOptions();
  fontColourOptions = this.GetFontColourOptions();
  fontSizeOptions = this.GetFontSizeOptions();
  accentColourOptions = this.GetAccentColourOptions();
  componentOneColourOptions = this.GetComponentOneColourOptions();
  componentTwoColourOptions = this.GetComponentTwoColourOptions();

  GetFontOptions(): Array<string> {
    var keys = Object.keys(FontOptions);
    return keys.slice(keys.length / 2);
  }

  GetFontColourOptions(): Array<string> {
    var keys = Object.keys(FontColourOptions);
    return keys.slice(keys.length / 2);
  }

  GetFontSizeOptions() {
    var keys = Object.keys(FontSizeOptions);
    return keys.slice(keys.length / 2);
  }

  GetBackgroundColourOptions() {
    var keys = Object.keys(BackgroundColourOptions);
    return keys.slice(keys.length / 2);
  }

  GetAccentColourOptions() {
    var keys = Object.keys(AccentColourOptions);
    return keys.slice(keys.length / 2);
  }

  GetComponentOneColourOptions() {
    var keys = Object.keys(ComponentOneColourOptions);
    return keys.slice(keys.length / 2);

  }

  GetComponentTwoColourOptions() {
    var keys = Object.keys(ComponentTwoColourOptions);
    return keys.slice(keys.length / 2);
  }

  CancelBtn() {
    this.nav.Navigate(PageName.Home);
  }

  SaveBtn() {
    console.log(this.newOptions);
    this.methods.SaveAsCookie(StorageDataLabels.AccessibilityOptions, this.newOptions)
    this.nav.Navigate(PageName.Home);
  }
}
