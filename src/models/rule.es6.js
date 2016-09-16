import Base from './base';

export default class Rule extends Base {
  _type = 'Rule';

  validators() {
    const kind = this.kindValidator.bind(this);
    const shortName = this.shortNameValidator.bind(this);
    const r = this.subredditValidator.bind(this);

    return {
      kind,
      short_name: shortName,
      r,
    };
  }

  subredditValidator(subreddit) {
    return Base.validators.string(subreddit) &&
      Base.validators.minLength(subreddit, 1);
  }

  shortNameValidator(shortName) {
    return Base.validators.string(shortName) &&
      Base.validators.minLength(shortName, 1);
  }

  kindValidator(kind) {
    return (['all', 'kind', 'comment'].indexOf(kind) > -1);
  }
}
