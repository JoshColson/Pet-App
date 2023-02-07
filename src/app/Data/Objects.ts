import { Pet, Reminder } from './Interfaces';

var date = new Date();

export let ExampleReminderData: Reminder[] = [
  {
    entryId: 'exampleReminderEntryId1',
    entryDate: new Date(date.setDate(date.getDate() + 1)).toJSON().slice(0, 10).split('-').reverse().join('/'),
    entryPetId: 'DefaultPetId2',
    entryContent: 'Vet appointment 15:00'
  },
  {
    entryId: 'exampleReminderEntryId2',
    entryDate: new Date(date.setDate(date.getDate() + 1)).toJSON().slice(0, 10).split('-').reverse().join('/'),
    entryPetId: 'DefaultPetId1',
    entryContent: 'Take medicine 09:00'
  },
  {
    entryId: 'exampleReminderEntryId3',
    entryDate: new Date(date.setDate(date.getDate() + 3)).toJSON().slice(0, 10).split('-').reverse().join('/'),
    entryPetId: 'DefaultPetId1',
    entryContent: 'Weekly exercise 12:00'
  },
  {
    entryId: 'exampleReminderEntryId4',
    entryDate: '04/05/2023',
    entryPetId: 'DefaultPetId2',
    entryContent: 'Nails trimming appointment 08:00'
  },
]

export let ExamplePetData: Pet[] = [
  { petId: "DefaultPetId1", petName: "Django", petSpecies: "Dog", petBreed: "Poodle", petDob: "30/3/2016", petLastVetVisit: "20/1/2023", petWeight: "25 Kgs" },
  { petId: "DefaultPetId2", petName: "Remi", petSpecies: "Rat", petBreed: "Fancy Rat", petDob: "1/6/2020", petLastVetVisit: "29/11/2022", petWeight: "0.5 Kgs" }
  ]


