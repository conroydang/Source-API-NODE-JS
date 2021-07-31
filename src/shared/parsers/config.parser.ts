import { NextFunction, Request, Response } from 'express';
import * as config from '../../configs/config';
import { Config, RequestEx } from '../../model';

const ParseConfigFn = function (req: Request | RequestEx, _: Response, next: NextFunction): void {
  // let confString: string;

  // if (process.env.NODE_ENV) {
  //   confString = require('../../configs/config.prod.js').prod;
  // }

  ConfigParser.config = JSON.parse(JSON.stringify(config.default.dev)) as Config;

  (req as RequestEx).config = JSON.parse(JSON.stringify(config.default.dev)) as Config;
  
  next();
}

export const ConfigParser = {
  config: {} as Config,
  Parse: ParseConfigFn
}