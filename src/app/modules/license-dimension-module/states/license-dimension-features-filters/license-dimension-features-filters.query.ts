import {Injectable} from "@angular/core";
import {Query} from "@datorama/akita";
import {IFormControlBuilder} from "@openlm/openlm-common";
import {
  IFeatureFilterState,
  IFeatureSelectedFilterOptions
} from "../../apis/license-dimension-features-filters/license-dimension-features-filters.interface";
import { LicenseDimensionFeaturesFiltersStore } from "./license-dimension-features-filters.store";

@Injectable()
export class LicenseDimensionFeaturesFiltersQuery extends Query<IFeatureFilterState> {
  constructor(
    private filterStore: LicenseDimensionFeaturesFiltersStore
  ) {
    super(filterStore);
  }

  private filterFormValues: IFormControlBuilder<IFeatureSelectedFilterOptions>[] = [
    {
      fieldName: 'selectedServerNames',
      value: []
    },
    {
      fieldName: 'selectedVendorNames',
      value: []
    },
    {
      fieldName: 'selectedFeatureNames',
      value: []
    },
    {
      fieldName: 'selectedHostNames',
      value: []
    },
    {
      fieldName: 'selectedLicenseTypes',
      value: []
    }
  ]

  public getFilterFormValues(): IFormControlBuilder<IFeatureSelectedFilterOptions> [] {
    return this.filterFormValues
  }

  public getFeatureSelectedFilterOptions = (): IFeatureSelectedFilterOptions => ({
    selectedServerNames: this.getValue().selectedServerNames,
    selectedFeatureNames: this.getValue().selectedFeatureNames,
    selectedLicenseTypes: this.getValue().selectedLicenseTypes,
    selectedVendorNames: this.getValue().selectedVendorNames,
    selectedHostNames: this.getValue().selectedHostNames,
  })
}
