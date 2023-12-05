import {NgModule} from "@angular/core";
import {APOLLO_NAMED_OPTIONS, ApolloModule, NamedOptions} from "apollo-angular";
import {InMemoryCache} from "@apollo/client/core";
import {HttpLink} from "apollo-angular/http";

const operationalUri = 'operationalAPI/graphql/';
const testUri = 'testAPI/graphql';

export function createApolloClients(httpLink: HttpLink): NamedOptions {
  return {
    operationalData: {
      cache: new InMemoryCache({
        addTypename: false
      }),
      link: httpLink.create({uri: operationalUri}),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only'
        }
      }
    },
    testData: {
      cache: new InMemoryCache({
        addTypename: false
      }),
      link: httpLink.create({uri: testUri}),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only'
        }
      }
    }
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: createApolloClients,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
