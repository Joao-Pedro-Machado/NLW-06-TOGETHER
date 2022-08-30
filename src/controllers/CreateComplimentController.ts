import { Request, Response } from 'express';
import { CreateComplimentService } from '../service/CreateComplimentService';

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tagId, user_sender, user_receiver_email, message } = request.body;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute(tagId, user_sender, user_receiver_email, message);

    return response.json(compliment);
  }
}

export { CreateComplimentController };
