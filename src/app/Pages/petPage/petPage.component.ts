import { Component, OnInit } from '@angular/core';
import { NavigationModule } from '../../Logic/Navigation';
import { Pet, SystemData, Reminder } from '../../Data/Interfaces';
import { PageName, StorageDataLabels } from '../../Data/AppEnums';
import { SharedMethodsModule } from '../../Logic/SharedMethods';
import { DateAdapter } from '@angular/material/core';



@Component({
  selector: 'pet-page',
  templateUrl: './petPage.component.html',
  styleUrls: ['./petPage.component.css', '../../../generalStyles.css']
})
export class PetPage implements OnInit {
  constructor(public nav: NavigationModule,
    private methods: SharedMethodsModule,
    private dateAdapter: DateAdapter<Date>
  )
  {
    this.GetPageData()
  }
  accentAccessibility = this.methods.ReturnAccentAccessibilityChoices();
  accessibility = this.methods.ReturnAccessibilityChoices();
  pageData: SystemData = {};
  selectedPet: any;
  Object = Object;
  minCalendarDate = new Date();
  maxCalendarDate = new Date();
  newReminderDate: Date | undefined;
  newReminderContent: string = '';
  newReminderContentMaxChar: number = 50;
  showReminderMessage = false;
  reminderMessage = '';
  reminderMessageError = false;
  reminderData: Reminder[] = [];


  ngOnInit() {
    this.maxCalendarDate.setFullYear(this.maxCalendarDate.getFullYear() + 1);
    this.minCalendarDate.setDate(this.minCalendarDate.getDate() + 1);
    this.dateAdapter.setLocale('en-GB')
  }

  ResetReminderBtn() {
    this.ResetReminderForm();
    this.reminderMessage = "Reminder Reset.";
    this.showReminderMessage = true;
  }

  ResetReminderForm() {
    this.newReminderDate = undefined;
    this.newReminderContent = '';
  }

  TurnOffReminderMessage() {
    this.showReminderMessage = false;
    this.reminderMessageError = false;
    this.reminderMessage = '';
  }

  async SubmitReminderBtn() {
    var newReminderEntry: Reminder;
    if (this.newReminderDate === null || !this.newReminderDate) {
      this.reminderMessage = "Invalid date."
      this.showReminderMessage = true;
      this.reminderMessageError = true;
      return
    }
    if (this.reminderData && this.reminderData.length >= 10) {
      this.reminderMessage = "Too many reminder entries."
      this.showReminderMessage = true;
      this.reminderMessageError = true;
      return;
    }

    newReminderEntry = {
      entryId: this.GenerateId(),
      entryDate: this.methods.ReturnStringFromDate(this.newReminderDate),
      entryPetId: this.selectedPet.petId,
      entryContent: this.newReminderContent,
    }
    this.reminderData.push(newReminderEntry)
    await this.methods.SaveAsCookie(StorageDataLabels.Reminders, this.reminderData)

    this.newReminderDate = undefined;
    this.newReminderContent = '';
    this.reminderMessage = "Reminder Submitted!";
    this.showReminderMessage = true;
  }

  GetPageData() {
    var gatheredPageData = this.methods.ReturnDataFromCookie(StorageDataLabels.SystemData)
    var gatheredSelectedPet;
    if (gatheredPageData) {
      this.pageData = gatheredPageData
    }
    var petData: Pet[] = this.methods.ReturnDataFromCookie(StorageDataLabels.Pets)
    if (petData) {
      gatheredSelectedPet = petData.find(x => x.petId === this.pageData.petSelectedId) as Pet
    }
    if (gatheredSelectedPet)
    {
      this.selectedPet = gatheredSelectedPet as Pet;
    }
    if (!this.selectedPet) {
      this.BackBtn();
    }
    console.log(this.selectedPet)
    this.reminderData = this.methods.ReturnDataFromCookie(StorageDataLabels.Reminders);
  }

  RemovePetBtn() {
    if (this.selectedPet.petPictureLabel) {
      this.methods.RemoveDataFromStorage(this.methods.ReturnDataFromStorage(this.selectedPet.petPictureLabel));
    }
    this.methods.SaveAsCookie(StorageDataLabels.Pets, (this.methods.ReturnDataFromCookie(StorageDataLabels.Pets) as Pet[]).filter(x => x.petId != this.selectedPet.petId))
    this.methods.SaveAsCookie(StorageDataLabels.Reminders, this.reminderData.filter(x => x.entryPetId != this.selectedPet.petId))

    this.nav.Navigate(PageName.Home);
  }

  EditPetBtn() {
    this.nav.Navigate(PageName.EditPet);
  }

  BackBtn() {
    this.nav.Navigate(PageName.Home);
  }


  GenerateId(): string {
    var newId = Math.random().toString(36).slice(2);

    if ((this.reminderData && this.reminderData.find(x => x.entryId === newId))) {
      return this.GenerateId();
    }
    return newId
  }

}


