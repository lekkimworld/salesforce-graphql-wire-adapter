import { LightningElement, wire } from 'lwc';
import { gql, graphql } from 'lightning/uiGraphQLApi';

export default class AccountListGraphQL extends LightningElement {
    records;
    errors;
    minAmount = 1000000;

    @wire(graphql, {
        query: gql`
            query myOperationName($minAmount: Currency) {
                uiapi {
                    query {
                        Account(where: { AnnualRevenue: { gte: $minAmount } }) {
                            edges {
                                node {
                                    Id
                                    Name {
                                        value
                                    }
                                    AnnualRevenue {
                                        displayValue
                                    }
                                }
                            }
                        }
                    }
                }
            }`,
        variables: '$myVariables',
        operationName: 'myOperationName',
    })
    graphqlQueryResult({ errors, data }) {
        if (data) {
            console.log("Loaded data with GraphQL wire adapter", data);
            this.records = data.uiapi.query.Account.edges.map(edge => edge.node);
            this.errors = undefined;
        } else if (errors) {
            this.errors = errors;
        }
    }
  
  get myVariables() {
      return {
          minAmount: this.minAmount
      };
  }
}