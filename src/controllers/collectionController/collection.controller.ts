import { Collection, ObjectId } from 'mongodb';
import { CollectionService } from '../../services/collection.service';

export const CollectionController = {
  getMany: async (collection: Collection<any>, data: { id: string, query: any }): Promise<any> => {

    const limit = Number.parseInt(data.query?.limit);
    const skip = Number.parseInt(data.query?.skip);
    let filter: any = {};

    Object.keys(data.query)
      .filter(k => ['limit', 'skip'].every(r => r !== k))
      .forEach(k => filter[k] = k === '_id' ? new ObjectId(data.query[k]) : data.query[k]);
      
    filter = CollectionService.buildFilterFn(filter);

    const result = await collection.find(filter, {
      limit: limit,
      skip: skip
    }).toArray();

    return result.map(r => CollectionService.removePasswordFromSource(r));
  },
  getOne: async (collection: Collection<any>, data: { id: string }): Promise<any> => {
    const obj = await collection.findOne({ '_id': new ObjectId(data.id) });
    return CollectionService.removePasswordFromSource(JSON.parse(JSON.stringify(obj)));
  },
  post: async (collection: Collection<any>, data: { body: any,image:any }): Promise<any> => {
    await collection.insertOne(data.body);
    return 'ok';
  },
  put: async (collection: Collection<any>, data: { id: string, body: any }): Promise<any> => {
    const obj = await collection.findOne({'_id':new ObjectId(data.id)});
    await collection.updateOne(obj,{$set:data.body});
    return 'ok'
  },
  delete: async (collection: Collection<any>, data: { id: string }): Promise<any> => {
    await collection.findOneAndDelete({ '_id': new ObjectId(data.id) });
    return 'ok'
  }
}