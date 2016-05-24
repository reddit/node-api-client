import { last } from 'lodash/array';
import { MergedApiReponse } from './APIResponse';

export const withQueryAndResult = (response, fn) => {
  let query;
  let results;

  if (response instanceof MergedApiReponse) {
    query = response.lastQuery;
    results = response.lastResponse.results;
  } else {
    query = response.query;
    results = response.results;
  }

  return fn(query, results);
};

export const afterResponse = (response) => withQueryAndResult(response, (query, results) => {
  const limit = query.limit || 25;
  return results.length >= limit ? last(results).paginationId : null;
});

export const beforeResponse = response => withQueryAndResult(response, (query, results) => {
  return query.after ? results[0].paginationId : null;
});

export const fetchAll = async (fetchFunction, apiOptions, initialParams, afterFn=afterResponse) => {
  let params = { ...initialParams };
  let response = await fetchFunction(apiOptions, params);

  let after = afterFn(response);
  while (after) {
    params = { ...params, after };
    response = response.appendResponse(await fetchFunction(apiOptions, params));
    after = afterResponse(response);
  }

  return response;
};
