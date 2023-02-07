import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedMethodsModule } from '../../../../Logic/SharedMethods';
import { DaysOfWeek } from '../../../../Data/AppEnums';
import { Reminder, Pet, AccentAccessibilityChoices } from '../../../../Data/Interfaces';


@Component({
  selector: 'component-reminder-entry',
  templateUrl: './reminder-entry.component.html',
  styleUrls: ['./reminder-entry.component.css', '../../../../../generalStyles.css'],
})
export class ReminderEntryComponent implements OnInit {
  constructor( private methods: SharedMethodsModule) {  }

  @Input() entry: Reminder | undefined;
  @Input() reminderIndex: number = 0;
  @Input() accessibility: string[] = [];
  @Input() accentAccessibility: AccentAccessibilityChoices = { accentColour: '', componentOneColour: '', componentTwoColour:'' };
  @Output() emitEntryDeleted = new EventEmitter<string>();

  colourStyle='';

  currentPet: Pet | undefined;
  displayDate: string = '';

  ngOnInit() {
    if (this.entry) {
      this.currentPet = this.methods.ReturnPetFromId(this.entry.entryPetId);
    }
    this.displayDate = this.CalculateDisplayDate();

    if (this.reminderIndex % 2 === 0) {
      this.colourStyle = this.accentAccessibility.componentOneColour;
    }
    else {
      this.colourStyle = this.accentAccessibility.componentTwoColour;
    }
  }

  CalculateDisplayDate(): string {
    if (this.entry) {
      var todayDate = new Date();
      var choppedUpDate: any = this.entry.entryDate.split("/");
      var entryDate: Date = new Date(+choppedUpDate[2], choppedUpDate[1] - 1, +choppedUpDate[0]);

      if (entryDate.toDateString() === new Date(todayDate.setDate(todayDate.getDate() + 1)).toDateString()) {
        return "Tomorrow";
      }
      todayDate = new Date();
      if (entryDate < new Date(todayDate.setDate(todayDate.getDate() + 5)) && entryDate > new Date(todayDate.getDate())) {
        return DaysOfWeek[entryDate.getDay()]
      }
      return this.entry.entryDate
    }
    return ''
  }

  DeleteEntry() {
    this.emitEntryDeleted.emit(this.entry?.entryId);
  }
}
