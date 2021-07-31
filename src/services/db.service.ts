import { Request } from "express";
import { Collection, Db, MongoClient } from "mongodb";
import { RequestEx } from "../model";

const getDatabaseFn = (req: Request | RequestEx): MongoClient => {

  const config = (req as RequestEx).config;
  console.log((req as RequestEx).attr_name)

  return new MongoClient(config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

const addCollectionFn = async (_db: Db, name: string): Promise<Collection<any>> => {
  return _db.createCollection(name, {});
}

const createCollectionIfEmpty = async (_db: Db, name: string): Promise<Collection<any>> => {
  if (await _db.listCollections({ name: name }).hasNext()) {
    return _db.collection(name);
  }
  return addCollectionFn(_db, name);
}

const getCollectionFn = async (_db: Db, name: string): Promise<Collection<any>> => {
  return createCollectionIfEmpty(_db, name);
}

export const db = {
  GetDatabase: getDatabaseFn,
  AddCollection: addCollectionFn,
  GetCollection: getCollectionFn
}