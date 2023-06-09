import { Request, Response } from 'express';
import Controller from '../decorator/RouteDecorator/controller.decorator';
import { Get } from '../decorator/RouteDecorator/handler.decorator';

@Controller('/api/')
export default class APIController {
  @Get('')
  public async getCall(req: Request, res: Response) {
    return res.status(200).json({ message: 'working' });
  }
}
