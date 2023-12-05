import {IFilterPageInfo} from "@openlm/openlm-common";

export interface IFeatureSelectedFilterOptions {
  selectedServerNames: string[];
  selectedVendorNames: string[];
  selectedFeatureNames: string[];
  selectedHostNames: string[];
  selectedLicenseTypes: string[];
}

export interface IFeatureFilterOptions {
  serverName: IFilterPageInfo<string>;
  vendorName: IFilterPageInfo<string>;
  hostName: IFilterPageInfo<string>;
  featureName: IFilterPageInfo<string>;
  licenseType: IFilterPageInfo<string>;
}

export interface IFeatureFilterState extends IFeatureFilterOptions, IFeatureSelectedFilterOptions {
}
