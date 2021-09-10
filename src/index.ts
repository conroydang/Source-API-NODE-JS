import e from 'express';
import { AuthController } from './controllers';
import { CollectionController } from './controllers/collectionController/collection.controller';
import { ResponseService } from './services/index';
import {
  AuthHandler,
  ConfigParser,
  RequestHandler,
  RequireJson,
  UseCors
} from './shared';

const port: number = (process.env.PORT || 3000) as number;

const app: e.Express = RequireJson(UseCors(e()));

app.get('/health', function (_, res) {
  res.send(ResponseService.ok('Hello World!!!'));
});

app.use(ConfigParser.Parse);

app.post('/auth/login', AuthHandler.HandleLoginRequest(AuthController.login));
app.post('/auth/register', AuthHandler.HandleLoginRequest(AuthController.register));

// this is for generic /api
app.get('/api/roles',
  AuthHandler.VerifyToken,
  AuthHandler.VerifyRoles('admin'),
  AuthHandler.HandleRolesRequest(CollectionController.getMany));
app.get('/api/roles/:id',
  AuthHandler.VerifyToken,
  AuthHandler.VerifyRoles('admin'),
  AuthHandler.HandleRolesRequest(CollectionController.getOne));
app.post('/api/roles',
  AuthHandler.VerifyToken,
  AuthHandler.VerifyRoles('admin'),
  AuthHandler.HandleRolesRequest(CollectionController.post));
app.delete('/api/roles',
  AuthHandler.VerifyToken,
  AuthHandler.VerifyRoles('admin'),
  AuthHandler.HandleRolesRequest(CollectionController.delete));
app.put('/api/roles/:id',
  AuthHandler.VerifyToken,
  AuthHandler.VerifyRoles('admin'),
  AuthHandler.HandleRolesRequest(CollectionController.put));

// this is for generic /api
app.get('/api/:collection',  RequestHandler(CollectionController.getMany));
app.post('/api/:collection',RequestHandler(CollectionController.post));
app.delete('/api/:collection', AuthHandler.VerifyToken, RequestHandler(CollectionController.delete));

app.get('/api/:collection/:id', RequestHandler(CollectionController.getOne));
app.delete('/api/:collection/:id', AuthHandler.VerifyToken, RequestHandler(CollectionController.delete));
app.put('/api/:collection/:id', AuthHandler.VerifyToken, RequestHandler(CollectionController.put));

app.listen(port, function () {
  console.log(`App is listening on port ${port}!`);
});
