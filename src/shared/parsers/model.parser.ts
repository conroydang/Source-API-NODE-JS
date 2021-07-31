import { Request } from 'express';

interface ServiceHandler<type> { (model: type): any };

export const UseModel = function<type>(req: Request, handler: ServiceHandler<type>): any {
  const model = req.body as type;

  return handler(model);
}