import { GetCountriesDocument } from "../../gql/graphql";
import { urqlQuery } from "../../utils/urql.client";

export const getCountries = urqlQuery(GetCountriesDocument, "countries")