import {
  GraphQLBuilder,
  IFilterPageInfo
} from '@openlm/openlm-common';
import {QueryOptions, gql} from '@apollo/client/core';

export const fetchServerNameFilterDataSource = <T>(pageInfo?: IFilterPageInfo<T>): QueryOptions => {
  const query = new GraphQLBuilder<string>()
    .offsetPaginated(pageInfo?.pageSize, pageInfo?.page)
    .filterSearch(pageInfo?.searchTerm);

  return {
    query: gql`
      query serversFilter {
        serversFilter (${query.query}){
          items {
            description
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }`
  }
}

export const fetchFeatureNameFilterDataSource = <T>(pageInfo?: IFilterPageInfo<T>): QueryOptions => {
  const query = new GraphQLBuilder<string>()
    .offsetPaginated(pageInfo?.pageSize, pageInfo?.page)
    .filterSearch(pageInfo?.searchTerm);

  return {
    query: gql`
      query featuresFilter {
        featuresFilter (${query.query}) {
          items
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }`
  }
}

export const fetchVendorNameFilterDataSource = <T>(pageInfo?: IFilterPageInfo<T>): QueryOptions => {
  const query = new GraphQLBuilder<string>()
    .offsetPaginated(pageInfo?.pageSize, pageInfo?.page)
    .filterSearch(pageInfo?.searchTerm);

  return {
    query: gql`
      query vendorsFilter {
        vendorsFilter (${query.query}) {
          items {
            vendor
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }`
  }
}

export const fetchLicenseTypeFilterDataSource = <T>(): QueryOptions => ({
  query: gql`
      query licenseTypesFilter {
        licenseTypesFilter
      }`
})
