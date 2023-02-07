import { Component, OnInit,  } from '@angular/core';
import { NavigationModule } from '../../Logic/Navigation';
import { Pet, SystemData, Reminder } from '../../Data/Interfaces';
import { PageName, StorageDataLabels } from '../../Data/AppEnums';
import { SharedMethodsModule } from '../../Logic/SharedMethods';



@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../generalStyles.css']
})
export class HomePage implements OnInit {
  constructor(private nav: NavigationModule,
    private methods: SharedMethodsModule,
  )
  {
    this.nav.UrlProtect();
    this.GetPageData();
    this.FormatReminderData();
  }
  pageData: SystemData = { };
  petData: Pet[] = [];
  reminderData: Reminder[] = [];
  accessibility = this.methods.ReturnAccessibilityChoices();
  accentAccessibility = this.methods.ReturnAccentAccessibilityChoices();

  ngOnInit() {
    console.log(this.accessibility);
    console.log(this.accentAccessibility)
  }

  GetPageData() {
    var gatheredPetData = this.methods.ReturnDataFromCookie(StorageDataLabels.Pets)
    if (gatheredPetData) {
      this.petData = gatheredPetData
    }
    var gatheredPageData = this.methods.ReturnDataFromCookie(StorageDataLabels.SystemData)
    if (gatheredPageData) {
      this.pageData = gatheredPageData
    }


  }

  ReturnButtonColClass() {
    if (this.accessibility.indexOf('FontSizeSeventyFive') > -1) {
      return 'col-md-6 col-12';
    }

    else if (this.accessibility.indexOf('FontSizeOneHundred') > -1) {
      return 'col-md-6 col-12';
    }

    else if (this.accessibility.indexOf('FontSizeFifty') > -1)
    {
      return 'col-12 col-sm-6 col-md'
    }

    else if (this.accessibility.indexOf('FontSizeDefault') > -1) {
      return 'col-12 col-sm-6 col-md'
    }

    else if (this.accessibility.indexOf('FontSizeTwentyFive') > -1)
    {
      return 'col-12 col-sm-6 col-md'
    }
    return ''
  }

  ReturnHeadshotColClass() {
    if (this.accessibility.indexOf('FontSizeSeventyFive') > -1) {
      return 'col-md-4 col-lg-3 col-sm-6 col-12';
    }
    else if (this.accessibility.indexOf('FontSizeOneHundred') > -1) {
      return 'col-md-4 col-lg-3 col-sm-6 col-12';
    }
    else if (this.accessibility.indexOf('FontSizeFifty') > -1) {
      return 'col-lg-2 col-md-3 col-sm-4 col-6';
    }
    else if (this.accessibility.indexOf('FontSizeDefault') > -1) {
      return 'col-lg-2 col-md-3 col-sm-4 col-6';
    }
    else if (this.accessibility.indexOf('FontSizeTwentyFive') > -1) {
      return 'col-lg-2 col-md-3 col-sm-4 col-6';
    }
    return ''
  }

  FormatReminderData() {
    this.reminderData = this.methods.ReturnReminderData()
    this.reminderData.sort(({ entryDate: a }, { entryDate: b }) => this.methods.ReturnDateFromString(a) < this.methods.ReturnDateFromString(b) ? -1 : this.methods.ReturnDateFromString(a) > this.methods.ReturnDateFromString(b) ? 1 : 0);
    this.reminderData = this.reminderData.slice(0, 10);
  }

  AddPetBtn() {
    this.nav.Navigate(PageName.AddPet);
  }

  AccessibilityBtn() {
    this.nav.Navigate(PageName.Accessibility);
  }

  ResetBtn() {
    this.methods.CreateNewSession();
    window.location.reload();
  }

  PetSelectionButton(petId: string) {
    if (!this.petData.find(x => x.petId === petId))
    {
      console.error("Pet not Found.");
      return;
    }
    this.pageData.petSelectedId = petId;
    this.methods.SaveAsCookie(StorageDataLabels.SystemData, this.pageData);
    this.nav.Navigate(PageName.PetPage);
  }

  DeleteReminderEntry(entryId: string) {
    this.reminderData = this.reminderData.filter(x => x.entryId !== entryId);
    this.methods.SaveAsCookie(StorageDataLabels.Reminders, this.reminderData);
  }

  BackBtn() {
    this.nav.Navigate(PageName.LandingPage);
  }

}


