import { Component, OnInit } from '@angular/core';
import { Pet, SystemData } from '../../Data/Interfaces';
import { NavigationModule } from '../../Logic/Navigation';
import { PageName, StorageDataLabels } from '../../Data/AppEnums';
import { SharedMethodsModule } from '../../Logic/SharedMethods';
import { DateAdapter } from '@angular/material/core';



@Component({
  selector: 'edit_pet-page',
  templateUrl: './editPet.component.html',
  styleUrls: ['./editPet.component.css', '../../../generalStyles.css']
})
export class EditPetPage implements OnInit {
  constructor(private nav: NavigationModule,
    private methods: SharedMethodsModule,
    private dateAdapter: DateAdapter<Date>
  )
  {
    this.GetPageData();
    this.SetExistingData();
    this.SetDateInformation();
  }
  ngOnInit()
  {
  }
  newPetNameMaxChar = 10;
  newPetDetailsMaxChar = 15;
  accentAccessibility = this.methods.ReturnAccentAccessibilityChoices();
  accessibility = this.methods.ReturnAccessibilityChoices();
  uploadData: { dataLabel?: string, ImageAsBinary?: string, FileName?: string, uploadError: boolean, uploadErrorMessage?: string } = { uploadError: false };
  petData: Pet[] = [];
  maxCalendarDate = new Date();
  minDobDate = new Date();
  minVetDate = new Date();
  setPetDob: Date | undefined;
  setLastVetVisit: Date | undefined;
  pageData: SystemData = {};
  selectedPet: any;
  newPet: any;


  ReturnPetNameRemainingChars(content: any, maxChars: number) {
    if (content) {
      return maxChars - content.length
    }
    return maxChars
  }

  GetPageData() {
    this.petData = this.methods.ReturnDataFromCookie(StorageDataLabels.Pets) as Pet[];
    var gatheredPageData = this.methods.ReturnDataFromCookie(StorageDataLabels.SystemData)
    var gatheredSelectedPet;
    if (gatheredPageData) {
      this.pageData = gatheredPageData
    }
    var tempPetData: Pet[] = this.methods.ReturnDataFromCookie(StorageDataLabels.Pets)
    if (tempPetData) {
      gatheredSelectedPet = tempPetData.find(x => x.petId === this.pageData.petSelectedId) as Pet
    }
    if (gatheredSelectedPet) {
      this.selectedPet = gatheredSelectedPet as Pet;

      this.newPet = JSON.parse(JSON.stringify(this.selectedPet)) as Pet;
    }
    if (!this.selectedPet) {
      this.CancelBtn();
    }
    this.uploadData.dataLabel = this.selectedPet.dataLabel;
  }

  SetDateInformation() {
    this.dateAdapter.setLocale('en-GB')
    this.maxCalendarDate.setDate(this.maxCalendarDate.getDate() - 1);
    this.minDobDate.setFullYear(this.minDobDate.getFullYear() - 100);
    if (this.selectedPet.petDob) {
      var dateFormat = this.newPet.petDob.split("/");
      this.minVetDate = new Date(+dateFormat[2], dateFormat[1] - 1, +dateFormat[0]);
    }
    else {
      this.minVetDate = this.minDobDate;
    }

    if (this.newPet.petDob) {
      var dateFormat = this.newPet.petDob.split("/");
      this.setPetDob = new Date(+dateFormat[2], dateFormat[1] - 1, +dateFormat[0]);
    }
    if (this.newPet.petLastVetVisit) {
      dateFormat = this.newPet.petLastVetVisit.split("/");
      this.setLastVetVisit = new Date(+dateFormat[2], dateFormat[1] - 1, +dateFormat[0]);
    }
  }




  GenerateId(): string {
    var newId = Math.random().toString(36).slice(2);

    if ((this.petData && this.petData.find(x => x.petId === newId)) || (this.petData && this.petData.find(x => x.petPictureLabel === newId))) {
      return this.GenerateId();
    }
    return newId
  }

  SetExistingData() {
    if (this.selectedPet.petPictureLabel) {
      this.uploadData.FileName = this.selectedPet.petPictureFileName;
    }
  }

  CancelBtn() {
    this.nav.Navigate(PageName.PetPage);
  }


  SaveBtn() {

    if (this.setPetDob != null) {
      this.newPet.petDob = new Date(this.setPetDob.getTime() - (this.setPetDob.getTimezoneOffset() * 60000)).toJSON().slice(0, 10).split('-').reverse().join('/');
    }
    if (this.setLastVetVisit != null) {
      this.newPet.petLastVetVisit = new Date(this.setLastVetVisit.getTime() - (this.setLastVetVisit.getTimezoneOffset() * 60000)).toJSON().slice(0, 10).split('-').reverse().join('/');
    }

    if (this.petData) {
      let i = 0;
      let different = false;

      if (i === 0 && Object.keys(this.selectedPet).length !== Object.keys(this.newPet).length || this.selectedPet.petPictureFileName !== this.uploadData.FileName) {
        different = true;
      }

      for (let key of Object.keys(this.newPet)) {
        if (different === true) {
          break;
        }
        if (key !== Object.keys(this.selectedPet)[i] || Object.values(this.newPet)[i] !== Object.values(this.selectedPet)[i]) {
          different = true;
          break;
        }
        i++;
      }
      if (different === false) {
        this.CancelBtn();
        return;
      }
    }

    if (this.uploadData.FileName !== this.selectedPet.petPictureFileName) {
      this.methods.RemoveDataFromStorage(this.selectedPet.petPictureLabel);
      if (this.uploadData.FileName) {
        this.uploadData.dataLabel = this.GenerateId();
        this.methods.SaveInStorage(this.uploadData.dataLabel, this.uploadData.ImageAsBinary);
        this.newPet.petPictureLabel = this.uploadData.dataLabel;
      }
      this.newPet.petPictureLabel = this.uploadData.dataLabel;
      this.newPet.petPictureFileName = this.uploadData.FileName;
    }
    else if (this.selectedPet.petPictureLabel){
      this.newPet.petPictureLabel = this.selectedPet.petPictureLabel;
    }
    this.petData = this.petData.filter(x => x.petId != this.selectedPet.petId);
    this.petData.push(this.newPet);
    this.methods.SaveAsCookie(StorageDataLabels.Pets, this.petData);
    this.CancelBtn();
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

