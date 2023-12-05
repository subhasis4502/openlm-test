import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared-module/shared.module";
import { LicenseDimensionFeaturesApiService } from "./apis/license-dimension-features/license-dimension-features.api.service";
import { LicenseDimensionFeaturesComponent } from "./components/license-dimension-features/license-dimension-features.component";
import { LicenseDimensionFeaturesFiltersFacade } from "./facades/license-dimension-features-filters.facade";
import { LicenseDimensionFeaturesFacade } from "./facades/license-dimension-features.facade";
import { LicenseDimensionFeaturesQuery, LicenseDimensionFeaturesStore } from "./states/license-dimension-features";
import { LicenseDimensionFeaturesFiltersStore, LicenseDimensionFeaturesFiltersQuery } from "./states/license-dimension-features-filters";
import { LicenseDimensionFeaturesFiltersApiService } from "./apis/license-dimension-features-filters/license-dimension-features-filters.api.service";

@NgModule({
  declarations: [
    LicenseDimensionFeaturesComponent,
  ],
  imports: [
    SharedModule
  ],
  providers: [
    LicenseDimensionFeaturesStore,
    LicenseDimensionFeaturesQuery,
    LicenseDimensionFeaturesFacade,
    LicenseDimensionFeaturesApiService,
    LicenseDimensionFeaturesFiltersStore,
    LicenseDimensionFeaturesFiltersQuery,
    LicenseDimensionFeaturesFiltersFacade,
    LicenseDimensionFeaturesFiltersApiService
  ]
})
export class LicenseDimensionFeaturesModuleComponent {
}
