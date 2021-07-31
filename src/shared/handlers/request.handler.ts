import { Request, Response } from 'express';
import { Collection, MongoClient, MongoError } from 'mongodb';
import { RequestEx } from '../../model';
import { db, ResponseService } from '../../services';

export const RequestHandler = (handler: <t>(collection: Collection<any>, data: any) => Promise<t>) => {
  return (req: Request | RequestEx, res: Response): void => {
    const collectionName = (req as Request).params['collection'].toLowerCase();
    const data: {id: string, body: any, query: any} = {
      id: (req as Request).params['id'] ?? (req as Request).query['id'],
      body: (req as Request).body,
      query: (req as Request).query
    }
    console.log(data.body);

    db.GetDatabase(req).connect(async (err: MongoError, client: MongoClient) => {

      const _db = client.db();
      if (err) {
        res.send(ResponseService.error('Cannot connect to database'));
      } else if (_db) {
        try {
          const result = await handler<any>(await db.GetCollection(_db, collectionName), data);

          res.send(ResponseService.ok(result));
        } catch (error) {
          const message = error?.message ?? error;
          res.send(ResponseService.error(message));
        } finally {

          console.log('Close Db connect');
          await client.close();
        }
      } else {

        await client.close();

        res.send(ResponseService.error('Cannot connect to database'));
      }
    })
  }
}