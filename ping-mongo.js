require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI is missing from .env');
}

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });

(async () => {
  try {
    await client.connect();
    const result = await client.db('admin').command({ ping: 1 });
    console.log('PING_RESULT=' + JSON.stringify(result));
  } catch (error) {
    console.error('Mongo error: ' + error.message);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
})();
