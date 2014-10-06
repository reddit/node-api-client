module.exports = {
  v1: require('./endpoints/v1'),
  models: {
    Account: require('./models/account'),
    Award: require('./models/award'),
    Base: require('./models/base'),
    Comment: require('./models/comment'),
    Link: require('./models/link'),
    Message: require('./models/message'),
    Promocampaign: require('./models/promocampaign'),
    Subreddit: require('./models/subreddit'),
    Vote: require('./models/Vote'),
  },
}
