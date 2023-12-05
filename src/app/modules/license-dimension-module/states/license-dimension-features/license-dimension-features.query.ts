import {Injectable} from "@angular/core";
import {GraphqlQueryBase} from "@openlm/openlm-common";
import {ILicenseDimensionState, LicenseDimensionFeaturesStore} from "./license-dimension-features.store";
import {ILicenseDimension} from "../../apis/license-dimension-features/license-dimension-features.interface";

@Injectable()
export class LicenseDimensionFeaturesQuery extends GraphqlQueryBase<ILicenseDimension, ILicenseDimensionState> {
  constructor(
    protected showHideStore: LicenseDimensionFeaturesStore
  ) {
    super(showHideStore);
  }
}
