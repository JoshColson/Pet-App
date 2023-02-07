import { NgModule } from '@angular/core';
import { HomePage } from '../Pages/home/home.component';
import { AddPetPage } from '../Pages/addPet/addPet.component';
import { EditPetPage } from '../Pages/editPet/editPet.component';
import { LandingPage } from '../Pages/landingPage/landingPage.component';
import { RouterModule } from '@angular/router';
import { PageName } from '../Data/AppEnums';
import { AccessibilityPage } from '../Pages/accessibility/accessibility.component';
import { PetPage } from '../Pages/petPage/petPage.component';

const routes = [
  { path: PageName.LandingPage, component: LandingPage },
  { path: PageName.Home, component: HomePage },
  { path: PageName.AddPet, component: AddPetPage },
  { path: PageName.EditPet, component: EditPetPage },
  { path: PageName.Accessibility, component: AccessibilityPage },
  { path: PageName.PetPage, component: PetPage },
]

@NgModule(
  {
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule {}


