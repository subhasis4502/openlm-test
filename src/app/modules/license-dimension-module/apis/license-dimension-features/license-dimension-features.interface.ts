export interface ILicenseDimension {
  licenseId: number;
  licenseFeature: string;
  licenseHostname: string;
  licenseAdditionalKey: string;
  licenseCandidateExpirationDate: string;
  licenseDescription: string;
  licenseExpirationDate: Date;
  licenseManagerType: string;
  licensePackageId: string;
  licensePort: number;
  licenseServer: string;
  licenseType: string;
  licenseVendor: string;
  licenseVersion: string;
}


export interface ILicenseDimensionUIState {
  areFiltersActive: boolean
}

