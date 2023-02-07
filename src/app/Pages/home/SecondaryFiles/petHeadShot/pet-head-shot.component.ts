import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedMethodsModule } from '../../../../Logic/SharedMethods';
import { AccentAccessibilityChoices } from '../../../../Data/Interfaces';

const noPetsName: string = "No pets found."
@Component({
  selector: 'component-pet_head_shot',
  templateUrl: './pet-head-shot.component.html',
  styleUrls: ['./pet-head-shot.component.css', '../../../../../generalStyles.css'],
})
export class PetHeadShotComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer, private methods: SharedMethodsModule) {  }

  @Output() emitPetSelected = new EventEmitter<string>();
  @Input() noPets: boolean = false;
  @Input() petButton: boolean = false;
  @Input() petName: string | undefined;
  @Input() petSpecies?: string = '';
  @Input() petId: string='';
  @Input() petPictureLabel?: string = 'no picture label';
  @Input() accessibility: string[] = [];
  @Input() accentAccessibility: AccentAccessibilityChoices = { accentColour: '', componentOneColour: '', componentTwoColour: '' };
  petImageBinary: string='';

  displayName: string = "<No name>";


  ngOnInit() {
    this.GetImageBinary();
    this.SetDisplayName();
    
  }

  Sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  async GetImageBinary() {
    if (!this.petPictureLabel) {
      this.petImageBinary = 'data:image/jpeg;base64,' + await this.methods.ReturnDefaultImageBinary(this.petSpecies);
      return;
    }
    this.petImageBinary = 'data:image/jpeg;base64,' + this.methods.ReturnDataFromStorage(this.petPictureLabel)
  }

  PetSelected() {
    this.emitPetSelected.emit(this.petId);
  }

  SetDisplayName() {
    if (this.noPets) {
      this.petName = noPetsName;
    }
    if (this.petName) {
      this.displayName = this.petName;
    }

  }
}
