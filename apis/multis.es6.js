import BaseAPI from './base.es6.js';
import Multi from '../models/multi.es6.js';

const ID_REGEX = /^user\/[^\/]+\/m\/[^\/]+$/;

class Multis extends BaseAPI {
  static dataCacheConfig = undefined;

  static mapSubreddits (subs) {
    return subs.map(s => s.name);
  }

  static formatData (data={}, method) {
    if (method === 'post' || method === 'put') {
      return {
        model: JSON.stringify({
          description_md: data.description,
          display_name: data.displayName,
          icon_name: data.iconName,
          key_color: data.keyColor,
          visibility: data.visibility,
          weighting_scheme: data.weightingScheme,
          subreddits: data.subreddits ? data.subreddits.map(s => ({ name: s })) : undefined,
        }),
        name: data.name,
      };
    }
    return data;
  }

  static buildId({ username, name, id }) {
    if (username && name) {
      return `user/${username}/m/${name}`;
    }

    if (id) { return id; }
  }

  get requestCacheRules () { return undefined; }

  model = Multi;

  path (method, query={}) {
    let id = Multis.buildId(query);

    switch (method) {
      case 'get':
        if (query.username) {
          if (query.username === 'me') {
            return 'api/multi/mine';
          } else if (id) {
            return `api/multi/${id}`;
          }

          return `api/multi/user/${query.username}`;
        }

        return 'api/multi';
      case 'put':
      case 'patch':
      case 'post':
      case 'del':
        return `api/multi/${id}`;
      case 'copy':
        return 'api/multi/copy';
      case 'move':
        return 'api/multi/rename';
    }
  }

  formatQuery (query, method) {
    if (method === 'get') {
      if (query.user) {
        query.username = query.user;
        delete query.user;
      }
    }

    return query;
  }

  formatBody (res) {
    const { body } = res;

    if (body && Array.isArray(body)) {
      return body.map(m => {
        const multi = m.data;

        multi.subreddits = Multis.mapSubreddits(multi.subreddits);
        return new Multi(multi).toJSON();
      });
    } else if (body) {
      const multi = body.data;
      multi.subreddits = Multis.mapSubreddits(multi.subreddits);
      return new Multi(multi);
    }
  }

  formatData (data) {
    return Multis.formatData(data);
  }

  copy (fromId, data) {
    if (!ID_REGEX.exec(fromId)) {
      throw new Error('ID did not match `user/{username}/m/{multiname}` format.');
    }

    data = {
      from: fromId,
      to: data.id,
      _method: 'post',
    };

    if (data && data.displayName) {
      data.display_name = data.displayName;
    }

    return this.save('copy', data);
  }

  move (fromId, toId, data) {
    if (!ID_REGEX.exec(fromId) || !ID_REGEX.exec(toId)) {
      throw new Error('ID did not match `user/{username}/m/{multiname}` format.');
    }

    const moveData = {
      _method: 'post',
      from: fromId,
      to: toId,
    };

    if (data && data.displayName) {
      moveData.display_name = data.displayName;
    }

    return this.save('move', moveData);
  }

  formatBody (res) {
    const { body } = res;
    if (body) {
      return new Multi(body.data || body).toJSON();
    }
  }
}

export default Multis;
