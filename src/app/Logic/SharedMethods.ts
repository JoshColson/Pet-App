import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxEncryptCookieService } from 'ngx-encrypt-cookie';
import { Pet, Reminder, AccentAccessibilityChoices } from '../Data/Interfaces';
import { ExamplePetData, ExampleReminderData } from '../Data/Objects'
import {
  StorageDataLabels,
  PetSpecies,
  ColourToHashValues,
  FontClasses,
  FontColourClasses,
  FontSizeClasses,
  BackgroundColourClasses,
  BackgroundColourOptions,
  AccentColourClasses,
  ComponentOneColourClasses,
  ComponentTwoColourClasses
} from '../Data/AppEnums';


@Injectable({
  providedIn: 'root'
})
export class SharedMethodsModule {
  constructor(private cookie: NgxEncryptCookieService)
  {
    
  }

  ClearAllCookies() {
    this.cookie.deleteAll();
  }

  SaveAsCookie(label: StorageDataLabels, data: any) {
    var cookieKey = this.ReturnDataFromCookie(StorageDataLabels.Key)
    if (!cookieKey) {
      cookieKey = this.cookie.generateKey();
      this.cookie.set(StorageDataLabels.Key, JSON.stringify(cookieKey), false)
    }
    if (this.cookie.check(label)) {
      this.cookie.delete(label, '/', undefined , true )
    }
    this.cookie.set(label, JSON.stringify(data), true, cookieKey, undefined, "/");
  }

  SaveInStorage(label: StorageDataLabels|string, data: any) {
    if (localStorage.getItem(label)) {
      localStorage.removeItem(label)
    }
    localStorage.setItem(label, JSON.stringify(data));
  }

  ReturnDataFromCookie(label: StorageDataLabels): any {
    try {
      if (label === StorageDataLabels.Key) {
        return JSON.parse(this.cookie.get(label, false))
      }
      return JSON.parse(this.cookie.get(label, true, this.ReturnDataFromCookie(StorageDataLabels.Key)));
    }
    catch (e: unknown) {
      console.log("Data not found.")
      return undefined
    }
  }
  ReturnDataFromStorage(label: StorageDataLabels|string): any {

    try {
      var retrievedData = localStorage.getItem(label);
      if (!retrievedData) {
        throw new Error()
      }
      return JSON.parse(retrievedData);
    }
    catch (e: unknown) {
      console.log("Data not found.")
      return undefined
    }
  }

  RemoveDataFromCookie(label: StorageDataLabels) {
    try {
       this.cookie.delete(label);
    }
    catch (e: unknown) {
      console.log("Data not found.");
    }
  }

  ReturnContainsKey(): boolean {
    try {
      return JSON.parse(this.cookie.get(StorageDataLabels.Key, false))
    }
    catch (e: unknown) {
      return false;
    }
  }

  RemoveDataFromStorage(label: StorageDataLabels) {
    try {
      localStorage.removeItem(label);
    }
    catch (e: unknown) {
      console.log("Data not found.");
    }
  }

  ReturnPetFromId(id: string):Pet {
    return (this.ReturnDataFromCookie(StorageDataLabels.Pets) as Pet[]).filter(x => x.petId === id)[0];
  }

  ReturnReminderData(): Reminder[] {
    return this.ReturnDataFromCookie(StorageDataLabels.Reminders) as Reminder[];
  }

  ReturnDateFromString(date: string): Date {
    var choppedUpDate: any = date.split("/");
    return new Date(+choppedUpDate[2], choppedUpDate[1] - 1, +choppedUpDate[0]);
  }

  ReturnStringFromDate(date: Date): string {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON().slice(0, 10).split('-').reverse().join('/');
  }

  async ReturnDefaultImageBinary(petSpecies: string|undefined) {
    var imageUrl = '';

    if (petSpecies?.toLocaleLowerCase().trim() === PetSpecies.Rat.toLocaleLowerCase().trim()) {
      imageUrl = "../../assets/Images/DefaultRat1.txt";
    }
    else {
      imageUrl = "../../assets/Images/DefaultDog1.txt";
    }
    var imageBinary = "";
    await fetch(imageUrl)
      .then(response => response.text())
      .then(text => imageBinary = text)
    return imageBinary;
  }

  async CreateNewSession() {
    await localStorage.clear();
    await this.ClearAllCookies();
    await this.SaveAsCookie(StorageDataLabels.Pets, ExamplePetData);
    await this.SaveAsCookie(StorageDataLabels.Reminders, ExampleReminderData)

  }

  ReturnAccessibilityChoices() {
    var accessibilityClasses = this.ReturnDataFromCookie(StorageDataLabels.AccessibilityOptions);
    var stringBuilder = [];

    if (accessibilityClasses?.font) {
      stringBuilder.push(accessibilityClasses.font.toString());
    }
    else {
      stringBuilder.push(FontClasses[FontClasses.FontDefault].toString());
    }

    if (accessibilityClasses?.fontColour) {
      stringBuilder.push(accessibilityClasses.fontColour.toString());
    }
    else {
      stringBuilder.push(FontColourClasses[FontColourClasses.FontColourDefault].toString());
    }

    if (accessibilityClasses?.fontSize) {
      stringBuilder.push(accessibilityClasses.fontSize.toString());
    }
    else {
      stringBuilder.push(FontSizeClasses[FontSizeClasses.FontSizeDefault]);
    }

    if (accessibilityClasses?.backgroundColour) {
      stringBuilder.push(accessibilityClasses.backgroundColour.toString());
      var colourEnumIndex: number = BackgroundColourClasses[accessibilityClasses.backgroundColour] as unknown as number;
      console.log(BackgroundColourOptions[colourEnumIndex]);

      var colourHashValue = Object.values(ColourToHashValues)[Object.keys(ColourToHashValues).indexOf(BackgroundColourOptions[colourEnumIndex].toString())]
      if (colourHashValue) {
        document.body.style.backgroundColor = colourHashValue;
      }
      else {
        document.body.style.backgroundColor = BackgroundColourOptions[colourEnumIndex].toString();
      }


    }
    else {
      stringBuilder.push(BackgroundColourClasses[BackgroundColourClasses.BackgroundColourDefault].toString())
    }
    return stringBuilder;
  }

  ReturnAccentAccessibilityChoices() {
    var accessibility = this.ReturnDataFromCookie(StorageDataLabels.AccessibilityOptions);
    var ObjBuilder: AccentAccessibilityChoices =
      { accentColour: '', componentOneColour: '', componentTwoColour: '' };

    if (accessibility?.accentColour) {
      ObjBuilder.accentColour = accessibility.accentColour.toString();
    }
    else {
      ObjBuilder.accentColour = (AccentColourClasses[AccentColourClasses.AccentColourDefault].toString());
    }

    if (accessibility?.componentOneColour) {
      ObjBuilder.componentOneColour = accessibility.componentOneColour.toString();
    }
    else {
      ObjBuilder.componentOneColour = (ComponentOneColourClasses[ComponentOneColourClasses.ComponentOneColourDefault].toString());
    }

    if (accessibility?.componentTwoColour) {
      ObjBuilder.componentTwoColour = accessibility.componentTwoColour.toString();
    }
    else {
      ObjBuilder.componentTwoColour = (ComponentTwoColourClasses[ComponentTwoColourClasses.ComponentTwoColourDefault].toString());
    }
    return ObjBuilder;
  }

}
