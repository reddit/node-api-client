import mixin from './mixin';
import comment from '../../apis/CommentsEndpoint';

export function reply (apiOptions, text) {
  const oldModel = this;

  return comment.post(apiOptions, {
    thingId: this.uuid,
    text,
  });
};

export default (cls) => mixin(cls, { reply });
