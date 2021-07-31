import { NextFunction, Request, Response } from "express";
import { Collection } from "mongodb";
import { RequestEx } from "../../model";
import { db, DecodeToken, ResponseService } from "../../services";

const HandlerFn = (name: string) => {
  return (handler: <t>(collection: Collection<any>, data: any) => Promise<t>) => {
    return (req: Request | RequestEx, res: Response): void => {
      const userCollectionName = name;
      const data = {
        body: (req as Request).body
      }

      db.GetDatabase(req).connect(async (err, client) => {
        const _db = client.db();

        if (_db) {
          try {
            const result = await handler<any>(await db.GetCollection(_db, userCollectionName), data);

            res.send(ResponseService.ok(result));

          } catch (error) {
            res.send(ResponseService.error(error.message));
          } finally {
            console.log('Connect Database Success');
            await client.close();
          }
        } else {

          await client.close();

          res.send(ResponseService.error('Cannot connect to database'));
        }
      })
    }
  }
}

const VerifyTokenFn = (req: Request, res: Response, next: NextFunction) => {
  const authString = req.headers['authorization'] ?? '';

  if (authString) {
    const token = authString.split(' ')[1];
    const tokenType = authString.split(' ')[0];

    if (tokenType.toUpperCase() === 'BEARER' && token) {
      const payload = JSON.parse(JSON.stringify(DecodeToken(token)));

      if (payload) {
        AuthHandler.config.roles = payload?.roles ?? [];
        next();
      } else {
        res.send(ResponseService.unauthorized());
      }
    } else {
      res.send(ResponseService.unauthorized());
    }
  } else {
    res.send(ResponseService.unauthorized());
  }
}

const VerifyRolesFn = (...roles: string[]): (req: Request, res: Response, next: NextFunction) => void => {
  return (_: Request, res: Response, next: NextFunction) => {
    if (roles.some(r => (AuthHandler.config?.roles as string[] ?? []).some(rr => rr === r))) {
      next();
    } else {
      res.send(ResponseService.unauthorized());
    }
  }
}

export const AuthHandler = {
  config: {} as any,
  HandleLoginRequest: HandlerFn('users'),
  HandleRolesRequest: HandlerFn('roles'),
  VerifyToken: VerifyTokenFn,
  VerifyRoles: VerifyRolesFn
}
