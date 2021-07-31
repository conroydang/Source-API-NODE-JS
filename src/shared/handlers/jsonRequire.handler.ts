import b from 'body-parser';
import e from 'express';

export const RequireJson = (app: e.Express): e.Express => {
  app.use(b.json());
  app.use(b.urlencoded({
    extended: false
  }))
  return app;
}