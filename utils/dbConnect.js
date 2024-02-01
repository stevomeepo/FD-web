import { MongoClient } from 'mongodb';

let client;
let db;

async function connectToDatabase(uri) {
  if (db) {
    return { db, client };
  }

  try {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    db = client.db('FDweb');
  } catch (error) {
    console.error('Could not connect to db', error);
    throw error;
  }

  db = client.db('FDweb');
  return { db, client };
}

export async function dbConnect() {
  const { db, client } = await connectToDatabase(process.env.MONGODB_URI);
  return { db, client };
}