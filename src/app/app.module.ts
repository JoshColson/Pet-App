import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PetHeadShotComponent } from './Pages/home/SecondaryFiles/petHeadShot/pet-head-shot.component';
import { ReminderEntryComponent } from './Pages/home/SecondaryFiles/reminderEntry/reminder-entry.component';

import { HomePage } from './Pages/home/home.component';
import { AppComponent } from './app.component';
import { LandingPage } from './Pages/landingPage/landingPage.component';
import { AccessibilityPage } from './Pages/accessibility/accessibility.component';
import { AddPetPage } from './Pages/addPet/addPet.component';
import { EditPetPage } from './Pages/editPet/editPet.component';
import { PetPage } from './Pages/petPage/petPage.component';

import { AppRoutingModule } from './Logic/Router.module';


import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { NavigationModule } from './Logic/Navigation';
import { SharedMethodsModule } from './Logic/SharedMethods';

import { GreenTickComponent } from '../assets/faComponents/green-tick-icon.component';
import { RedBinComponent } from '../assets/faComponents/red-bin-icon.component';
import { RedCrossComponent } from '../assets/faComponents/red-cross-icon.component';




@NgModule({
  declarations: [

    AppComponent,

    HomePage,
    LandingPage,
    AddPetPage,
    AccessibilityPage,
    PetPage,
    EditPetPage,

    RedBinComponent,
    GreenTickComponent,
    RedCrossComponent,
    PetHeadShotComponent,
    ReminderEntryComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,

    AppRoutingModule,
  ],
  exports: [],
  providers: [NavigationModule, SharedMethodsModule, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
