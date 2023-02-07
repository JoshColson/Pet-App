import {
  FontClasses,
  FontColourClasses,
  FontSizeClasses,
  BackgroundColourClasses,
  AccentColourClasses,
  ComponentOneColourClasses,
  ComponentTwoColourClasses
} from './AppEnums';

export interface Pet
{
  petId: string,
  petName?: string,
  petSpecies?: string,
  petBreed?: string,
  petDob?: string,
  petLastVetVisit?: string,
  petWeight?: string,
  petPictureLabel?: string,
  petPictureFileName?: string
}

export interface SystemData
{
  petSelectedId?: string;
}

export interface Reminder{
  entryId: string,
  entryDate: string,
  entryPetId: string,
  entryContent: string
}

export interface AccessibilityChoices {
  font?: FontClasses,
  fontColour?: FontColourClasses,
  fontSize?: FontSizeClasses,
  backgroundColour?: BackgroundColourClasses,
  accentColour?: AccentColourClasses,
  componentOneColour?: ComponentOneColourClasses,
  componentTwoColour?: ComponentTwoColourClasses
}

export interface AccentAccessibilityChoices {
  accentColour: string,
  componentOneColour: string,
  componentTwoColour: string
}

