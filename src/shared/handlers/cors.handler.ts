import c = require('cors');
import { Express } from 'express';

export const UseCors = function(app: Express): Express {
  app.use(c({
    origin: true
  }))

  return app;
}