import {Injectable} from '@angular/core';
import {StoreConfig} from '@datorama/akita';
import {IStateBase, GraphqlStoreBase} from '@openlm/openlm-common';
import {ILicenseDimension, ILicenseDimensionUIState} from "../../apis/license-dimension-features/license-dimension-features.interface";

const defaultGridColumns: (keyof ILicenseDimension)[] = [
  'licenseFeature',
  'licenseHostname',
  'licenseAdditionalKey',
  'licenseCandidateExpirationDate',
  'licenseDescription',
  'licenseExpirationDate',
  'licenseManagerType',
  'licensePackageId',
  'licensePort',
  'licenseServer',
  'licenseType',
  'licenseVendor',
  'licenseVersion',
];

export interface ILicenseDimensionState extends IStateBase<ILicenseDimension> {
  licenseDimensionsUIState: ILicenseDimensionUIState;
}

function createLicenseDimensionInitialState(): ILicenseDimensionState {
  return {
    licenseDimensionsUIState: {
      areFiltersActive: false,
    },
    paginatedResponse: {
      nodes: [],
      pageInfo: {
        startCursor: '',
        endCursor: ''
      },
      totalCount: 0
    },
    pageInfo: {
      currentPage: 1,
      pageRefreshed: false,
      pageSize: 25,
      direction: '',
      sortingState: {
        id: '',
        direction: ''
      }
    },
    lastPaginatedRequestOptions: {},
    visibleGridColumns: defaultGridColumns,
    defaultGridColumns
  };
}

@Injectable()
@StoreConfig({name: 'licenses.license-dimension-features'})
export class LicenseDimensionFeaturesStore extends GraphqlStoreBase<ILicenseDimension, ILicenseDimensionState> {
  constructor() {
    super(createLicenseDimensionInitialState());
  }

  public resetFilterActivityState(): void {
    this.update(state => ({
      ...state,
      licenseDimensionsUIState: {
        ...state.licenseDimensionsUIState,
        areFiltersActive: false
      }
    }));
  }
}
