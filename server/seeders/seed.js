const db = require('../config/connection');
const { User, Thought } = require('../models');
const userSeeds = require('./userSeeds.json');
const questionSeeds = require('./questionSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Thought', 'thoughts');
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < questionSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(questionSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
