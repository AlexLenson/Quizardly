const models = require('../models');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    const Model = models[modelName];
    if (Model) {
      await Model.deleteMany({});
    }
  } catch (err) {
    throw err;
  }
};
