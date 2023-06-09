import path from 'path';
import express, { Application, Handler } from 'express';
import morgan from 'morgan';
import logger from './lib/logger';
import MetadataKeys from './utils/metadata.keys';
import { IRouter } from './decorator/RouteDecorator/handler.decorator';
class ExpressApplication {
  private app: Application;

  constructor(
    private port: string | number,
    private middlewares: any[],
    private controllers: any[],
  ) {
    this.app = express();
    this.port = port;

    // __init__
    this.setupMiddlewares(middlewares);
    this.setupRoutes(controllers);
    this.configureAssets();
    this.setupLogger();
  }

  private setupMiddlewares(middlewaresArr: any[]) {
    middlewaresArr.forEach((middlewares) => {
      this.app.use(middlewares);
    });
  }

  private configureAssets() {
    this.app.use(express.static(path.join(__dirname, '../client/dist')));
  }

  private setupLogger() {
    if (process.env.NODE_ENV === 'development') this.app.use(morgan('dev'));
  }
  private setupRoutes(controllers: any[]) {
    const info: Array<{ api: string; handler: string }> = [];

    controllers.forEach((Controller) => {
      const controllerInstance: { [handleName: string]: Handler } =
        new Controller();

      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        Controller,
      );
      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        Controller,
      );

      const expressRouter = express.Router();

      routers.forEach(({ method, handlerPath, middlewares, handlerName }) => {
        if (middlewares) {
          expressRouter[method](
            handlerPath,
            ...middlewares,
            controllerInstance[String(handlerName)].bind(controllerInstance),
          );
        } else {
          expressRouter[method](
            handlerPath,
            controllerInstance[String(handlerName)].bind(controllerInstance),
          );
        }

        info.push({
          api: `${method.toLocaleLowerCase()} ${basePath + handlerPath}`,
          handler: `${Controller.name}.${String(handlerName)}`,
        });
      });

      this.app.use(basePath, expressRouter);
    });

    console.table(info);
  }

  public start() {
    return this.app.listen(this.port, () => {
      logger.info(`The application is running ${this.port} `);
    });
  }
}

export default ExpressApplication;
