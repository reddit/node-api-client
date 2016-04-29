import BaseContentEndpoint from './BaseContentEndpoint';
import Link from '../models2/Link';

export default class LinksEndpoint extends BaseContentEndpoint {
  model = Link;

  getPath (query) {
    if (query.user) {
      return `user/${query.user}/submitted.json`;
    } else if (query.id) {
      return `by_id/${query.id}.json`;
    } else if (query.ids) {
      return `by_id/${query.query.ids.join(',')}.json`;
    } else if (query.subredditName) {
      return `r/${query.subredditName}.json`;
    } else if (query.multi) {
      return `user/${query.multiUser}/m/${query.multi}.json`;
    }

    query.sort = query.sort || 'hot';

    return `${query.sort}.json`;
  }

  postPath () {
    return 'api/submit';
  }

  post (data) {
    const postData = {
      api_type: 'json',
      thing_id: data.thingId,
      title: data.title,
      kind: data.kind,
      sendreplies: data.sendreplies,
      sr: data.sr,
      iden: data.iden,
      captcha: data.captcha,
      resubmit: data.resubmit,
    };

    if (data.text) {
      postData.text = data.text;
    } else if (data.url) {
      postData.url = data.url;
    }

    return super.post(postData);
  }

  time(times, parseTimes) {
    const start = Date.now();
    return this.get({ subredditName: 'earthporn', limit: 100}).then(res => {
      const time = Date.now() - start;
      times.push(time);
      parseTimes.push(this.parseTime);
      console.log(`took ${time} -- parseTime ${this.parseTime}`);
      console.log(`num results? ${res.results.length}`);
    });
  }

  printTimeStats(kind, times) {
    console.log(`KIND: ${kind}`);
    const average = times.reduce((total, x) => x + total, 0) / times.length;
    const min = times.reduce((x, y) => Math.min(x, y), Infinity);
    const max = times.reduce((x, y) => Math.max(x, y), -Infinity);
    console.log(`\t${times.length} took ${average} averaged`);
    console.log(`\tMax: ${max} -- Min: ${min}`);
    times.sort((a, b) => a - b);
    console.log(`\ttimes ${times}`);
    return;
  }

  async timeAverages(numTimes, times = [], parseTimes=[]) {
    this.printTimeStats('Overall', times);
    this.printTimeStats('PARSING', parseTimes);

    if (numTimes === 0) {
      return;
    } else {
      console.log(`pending requests ${numTimes}`);
    }

    await this.time(times, parseTimes);
    setTimeout(() => {
      console.log('next');
      this.timeAverages(numTimes - 1, times, parseTimes);
    }, 10);
  }

  parseBody(res, apiResponse, req, method) {
    const { body } = res;

    if (method === 'get') {
      const { data } = body;

      if (data && data.children && data.children[0]) {
        if (data.children.length === 1) {
          apiResponse.addResult(Link.fromJSON(data.children[0].data));
          return;
        } else {
          data.children.forEach(c => apiResponse.addResult(Link.fromJSON(c.data)));
          return;
        }
      } else if (data) {
        return;
      }
    } else if (method !== 'del') {
      if (body.json && body.json.errors.length === 0) {
        apiResponse.addResult(body.json.data);
        return;
      } else {
        throw body.json;
      }
    }
  }
}
