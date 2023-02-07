import { Component, OnInit } from '@angular/core';
import { Pet } from '../../Data/Interfaces';
import { NavigationModule } from '../../Logic/Navigation';
import { PageName, StorageDataLabels } from '../../Data/AppEnums';
import { SharedMethodsModule } from '../../Logic/SharedMethods';
import { DateAdapter } from '@angular/material/core';


export enum CreateUserErrorMessages {
  usernameTaken = "Username taken, choose another one."
}

@Component({
  selector: 'add_pet-page',
  templateUrl: './addPet.component.html',
  styleUrls: ['./addPet.component.css', '../../../generalStyles.css']
})
export class AddPetPage implements OnInit {
  constructor(private nav: NavigationModule,
    private methods: SharedMethodsModule,
    private dateAdapter: DateAdapter<Date>

  )
  {

    this.dateAdapter.setLocale('en-GB')
    this.GetuserPetsWithPictureData();
    this.maxCalendarDate.setDate(this.maxCalendarDate.getDate() - 1);
    this.minCalendarDate.setFullYear(this.minCalendarDate.getFullYear() - 100);
  }
  ngOnInit()
  {
  }
  newPetNameMaxChar = 10;
  newPetDetailsMaxChar = 15;
  accentAccessibility = this.methods.ReturnAccentAccessibilityChoices();
  accessibility = this.methods.ReturnAccessibilityChoices();
  uploadData: { dataLabel: string, ImageAsBinary?: string, FileName?: string, uploadError: boolean, uploadErrorMessage?: string } = { dataLabel: this.GenerateId(), uploadError: false };
  petData: Pet[] = [];
  maxCalendarDate = new Date();
  minCalendarDate = new Date();

  newPet: Pet =
    {
      petId: this.GenerateId(),
    };


  ReturnPetNameRemainingChars(content:any, maxChars:number) {
    if (content) {
      return maxChars - content.length
    }
    return maxChars
  }

  GetuserPetsWithPictureData() {
    this.petData = this.methods.ReturnDataFromCookie(StorageDataLabels.Pets)
  }

  CancelBtn() {
    this.nav.Navigate(PageName.Home);
  }

  GenerateId():string {
    var newId = Math.random().toString(36).slice(2);

    if ((this.petData && this.petData.find(x => x.petId === newId)) || (this.petData && this.petData.find(x => x.petPictureLabel === newId)))
    {
      return this.GenerateId();
    }
    return newId
  }

  AddPetBtn() {
    
    if (this.petData) {
      if (this.petData.length > 3) {
        this.uploadData.uploadError = true;
        this.uploadData.uploadErrorMessage = "Too many pets!";
        return;
      }
      this.petData.push(this.newPet);
    }
    if (this.uploadData.ImageAsBinary) {
      this.methods.SaveInStorage(this.uploadData.dataLabel, this.uploadData.ImageAsBinary);
      this.newPet.petPictureLabel = this.uploadData.dataLabel;
      this.newPet.petPictureFileName = this.uploadData.FileName;
    }

    if (this.newPet.petDob) {
      var dobAsDate: Date = new Date(this.newPet.petDob)
      this.newPet.petDob = dobAsDate.toJSON().slice(0, 10).split('-').reverse().join('/')
    }
    if (this.newPet.petLastVetVisit) {
      var dobAsDate: Date = new Date(this.newPet.petLastVetVisit)
      this.newPet.petLastVetVisit = dobAsDate.toJSON().slice(0, 10).split('-').reverse().join('/')
    }

    this.methods.SaveAsCookie(StorageDataLabels.Pets, this.petData);
    this.nav.Navigate(PageName.Home);
  }

  async FileSelection(event: any) {
    if (event.target.files.length!==1) {
      return
    }
    var reader = new FileReader();
    reader.onload = this.ProccessDataCapturedFromFileSelectionReader.bind(this);
    reader.readAsBinaryString(await event.target.files[0] ?? null);
    this.uploadData.FileName = event.target.files[0].name
  }

  ProccessDataCapturedFromFileSelectionReader(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.uploadData.ImageAsBinary = btoa(binaryString);
    if (this.uploadData.ImageAsBinary.length > 500000) {
      console.error("Image size too large.")
      this.uploadData.uploadErrorMessage = "Image size too large."
      this.uploadData.ImageAsBinary = undefined;
      this.uploadData.FileName = undefined;
      return;
    }
    this.uploadData.uploadError = false;
    this.uploadData.uploadErrorMessage = undefined;
  }

  RemoveChosenFileBtn() {
    this.uploadData.ImageAsBinary = undefined;
    this.uploadData.FileName = undefined;
  }


}

