import apiRequest from '../apiBase/apiRequest';
import NoModelError from '../apiBase/errors/NoModelError';
import ValidationError from '../apiBase/errors/ValidationError';

import PostModel from '../models2/PostModel';
import CommentModel from '../models2/CommentModel';

const TYPE_MAP = {
  t1: CommentModel,
  t3: PostModel,
};

const ENDPOINT = '/api/editusertext';

export default {
  post(apiOptions, data={}) {
    const { thingId, text } = data;
    if (!thingId || !text) {
      throw new NoModelError(ENDPOINT);
    }

    const options = {
      type: 'form',
      query: {
        raw_json: 1, // make sure html back from the server is un-escaped
      },
      body: {
        api_type: 'json',
        text,
        thing_id: thingId,
      },
    };

    return apiRequest(apiOptions, 'POST', ENDPOINT, options)
      .then(apiResponse => {
        const { body: { json }} = apiResponse.response;
        if (json.errors.length) {
          throw new ValidationError(ENDPOINT, json.errors, apiResponse.response.status);
        }

        const thing = json.data.things[0];
        return TYPE_MAP[thing.kind].fromJSON(thing.data);
      });
  },
};
