import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LicenseDimensionFeaturesComponent } from './modules/license-dimension-module/components/license-dimension-features/license-dimension-features.component';

const routes: Routes = [
  {
    path: 'license-dimension',
    component: LicenseDimensionFeaturesComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'license-dimension'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
