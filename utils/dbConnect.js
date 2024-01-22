import { MongoClient } from 'mongodb';

let db;

async function connectToDatabase(uri) {
  if (db) {
    return db;
  }

  let client;

  try {
    client = new MongoClient(uri);
    await client.connect();
  } catch (error) {
    throw error;
  }

  db = client.db('FDweb');
  return db;
}

export async function dbConnect() {
  const result = await connectToDatabase(process.env.MONGODB_URI);
  return result;
}