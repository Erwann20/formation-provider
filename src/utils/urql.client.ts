import {
  CombinedError,
  createClient,
  fetchExchange,
  TypedDocumentNode,
} from "urql";

const API_URL = "https://countries.trevorblades.com";

const urqlClient = createClient({
  url: `${API_URL}/graphql`,
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    fetchExchange,
  ],
});

type GenericObject = { [prop: string]: unknown };

export function urqlQuery<TResult extends GenericObject, TVariables extends GenericObject>(
  queryDocument: TypedDocumentNode<TResult, TVariables>
): (variables: TVariables) => Promise<TResult>;

export function urqlQuery<
  TResult extends GenericObject,
  TVariables extends GenericObject,
  TKey extends keyof TResult
>(
  queryDocument: TypedDocumentNode<TResult, TVariables>,
  extractKey: TKey
): (variables?: TVariables) => Promise<TResult[TKey]>;

export function urqlQuery<
  TResult extends GenericObject,
  TVariables extends GenericObject,
  TKey extends keyof TResult
>(queryDocument: TypedDocumentNode<TResult, TVariables>, extractKey?: TKey) {
  return (variables: TVariables) =>
    urqlClient
      .query<TResult, TVariables>(queryDocument, variables)
      .toPromise()
      .then((res) => {
        if (res.error) {
          handleError(res.error);
        }
        if (!res.data) return null;
        if (extractKey) return res.data[extractKey];
        return res.data;
      });
}

export function urqlMutate<TResult extends GenericObject, TVariables extends GenericObject>(
  mutationDocument: TypedDocumentNode<TResult, TVariables>
): (variables: TVariables) => Promise<TResult>;

export function urqlMutate<
  TResult extends GenericObject,
  TVariables extends GenericObject,
  TKey extends keyof TResult
>(
  queryDocument: TypedDocumentNode<TResult, TVariables>,
  extractKey: TKey
): (variables: TVariables) => Promise<TResult[TKey]>;

export function urqlMutate<
  TResult extends GenericObject,
  TVariables extends GenericObject,
  TKey extends keyof TResult
>(mutationDocument: TypedDocumentNode<TResult, TVariables>, extractKey?: TKey) {
  return (variables: TVariables) =>
    urqlClient
      .mutation<TResult, TVariables>(mutationDocument, variables)
      .toPromise()
      .then((res) => {
        if (res.error) {
          handleError(res.error);
        }
        if (!res.data) return null;
        if (extractKey) return res.data[extractKey];
        return res.data;
      });
}

const handleError = (error: CombinedError) => {
  throw error;
};
