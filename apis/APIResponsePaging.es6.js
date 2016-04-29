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
    return results.length >= limit ? last(results).uuid : null;
});

export const beforeResponse = response => withQueryAndResult(response, (query, results) => {
  return query.after ? results[0].uuid : null;
});

export const fetchAll = async (fetchFunction, initialParams) => {
  let params = { ...initialParams };
  let response = await fetchFunction(params);

  let after = afterResponse(response);
  while (after) {
    params = { ...params, after };
    response = response.appendResponse(await fetchFunction(params));
    after = afterResponse(response);
  }

  return response;
};
