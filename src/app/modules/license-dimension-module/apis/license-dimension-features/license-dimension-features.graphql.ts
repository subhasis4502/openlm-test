import {
  GraphQLBuilder,
  IGraphQLPaginationBuilder,
  IGraphQLSortingBuilder,
  IGraphQLWhereBuilder
} from '@openlm/openlm-common';
import {ILicenseDimension} from './license-dimension-features.interface';
import {MutationOptions, QueryOptions, gql} from '@apollo/client/core';
import {IFeatureSelectedFilterOptions} from "../license-dimension-features-filters/license-dimension-features-filters.interface";

export const fetchLicenseDimensionsQuery = (
  visibleColumns?: (keyof ILicenseDimension)[],
  filterOptions?: IFeatureSelectedFilterOptions,
  pageInfo?: IGraphQLPaginationBuilder,
  sortInfo?: IGraphQLSortingBuilder
): QueryOptions => {
  let query = new GraphQLBuilder<ILicenseDimension>().cursorPaginated(pageInfo);

  if (!!sortInfo) {
    query = query.sorting(sortInfo);
  }

  const arrayOfValidParams: IGraphQLWhereBuilder<ILicenseDimension,
    keyof ILicenseDimension>[] = [];

  if (!!filterOptions?.selectedServerNames.length) {
    arrayOfValidParams.push({
      propertyName: 'licenseServer',
      filterValue: filterOptions.selectedServerNames,
      filterType: 'in'
    });
  }

  if (!!filterOptions?.selectedFeatureNames.length) {
    arrayOfValidParams.push({
      propertyName: 'licenseFeature',
      filterValue: filterOptions.selectedFeatureNames,
      filterType: 'in'
    });
  }

  if (!!filterOptions?.selectedVendorNames.length) {
    arrayOfValidParams.push({
      propertyName: 'licenseVendor',
      filterValue: filterOptions.selectedVendorNames,
      filterType: 'in'
    });
  }

  if (!!filterOptions?.selectedLicenseTypes.length) {
    arrayOfValidParams.push({
      propertyName: 'licenseType',
      filterValue: filterOptions.selectedLicenseTypes,
      filterType: 'in',
    });
  }

  if (!!filterOptions?.selectedHostNames.length) {
      arrayOfValidParams.push({
        propertyName: 'licenseHostname',
        filterValue: filterOptions.selectedHostNames,
        filterType: 'in',
        isEnum: true
      });
    }

  if (!!arrayOfValidParams.length) {
    query = query.where(arrayOfValidParams);
  }

  return {
    query: gql`
      query LicenseDimension {
        LicenseDimension(${query.query}) {
          nodes {
            licenseId
            ${visibleColumns},
          },
          pageInfo {
            startCursor,
            endCursor
          }
          totalCount
        }
      }
    `
  };
};

export const updateFeatureMutation = (
  payloadShow: number[],
  payloadHide: number[]
): MutationOptions => {
  if (!payloadHide[0]) {
    payloadHide = [];
  } else {
    payloadShow = [];
  }

  return {
    mutation: gql`
      mutation updateLicensesShowList($payloadShow: [Int!]! $payloadHide: [Int!]!) {
        updateLicensesShowList(listOfLicensesIdsToShow: $payloadShow listOfLicensesIdsDoNotShow: $payloadHide)
      }
    `,
    variables: {payloadShow, payloadHide}
  };
};
