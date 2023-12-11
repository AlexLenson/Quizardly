const db = require('../config/connection');
const { User, Question } = require('../models');
const userSeeds = require('./userSeeds.json');
const questionSeeds = require('./questionSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User');
    await cleanDB('Question');

    await User.create(userSeeds);

    for (let i = 0; i < questionSeeds.length; i++) {
      await Question.create(questionSeeds[i]);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Seed data has been added successfully!');
  process.exit(0);
});
