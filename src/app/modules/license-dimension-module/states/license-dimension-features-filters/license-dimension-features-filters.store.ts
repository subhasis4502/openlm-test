import {Injectable} from "@angular/core";
import {Store, StoreConfig} from "@datorama/akita";
import {
  IFeatureFilterOptions,
  IFeatureFilterState,
  IFeatureSelectedFilterOptions
} from "../../apis/license-dimension-features-filters/license-dimension-features-filters.interface";

function createFilterOptions(): IFeatureFilterOptions {
  return {
    serverName: {data: [], page: 1, pageSize: 25, totalPages: 1, searchTerm: ''},
    vendorName: {data: [], page: 1, pageSize: 25, totalPages: 1, searchTerm: ''},
    featureName: {data: [], page: 1, pageSize: 25, totalPages: 1, searchTerm: ''},
    hostName: {data: [], page: 1, pageSize: 25, totalPages: 1, searchTerm: ''},
    licenseType: {data: [], page: 1, pageSize: 25, totalPages: 1, searchTerm: ''},
  }
}

function createSelectedFilterOptions(): IFeatureSelectedFilterOptions {
  return {
    selectedServerNames: [],
    selectedVendorNames: [],
    selectedFeatureNames: [],
    selectedHostNames: [],
    selectedLicenseTypes: [],
  }
}

function createInitialState(): IFeatureFilterState {
  return {
    ...createFilterOptions(),
    ...createSelectedFilterOptions()
  }
}

@Injectable()
@StoreConfig({name: 'license-dimension-filter', resettable: true})
export class LicenseDimensionFeaturesFiltersStore extends Store<IFeatureFilterState> {

  constructor() {
    super(createInitialState());
  }

  public updateSelectedFilterOptions = (
    selectedFilterOptions: IFeatureSelectedFilterOptions
  ): void =>
    this.update(state => ({
      ...state,
      selectedServerNames: [...selectedFilterOptions.selectedServerNames],
      selectedFeatureNames: [...selectedFilterOptions.selectedFeatureNames],
      selectedVendorNames: [...selectedFilterOptions.selectedVendorNames],
      selectedHostNames: [...selectedFilterOptions.selectedHostNames],
      selectedLicenseTypes: [...selectedFilterOptions.selectedLicenseTypes],
    }));
}
