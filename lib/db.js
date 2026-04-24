import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not defined.');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // Development: global cache to avoid multiple connections during HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Production: new connection per cold start
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
