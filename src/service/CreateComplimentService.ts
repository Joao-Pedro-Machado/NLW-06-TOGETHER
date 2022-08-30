import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { TagsRepositories } from '../repositories/TagsRepositories';
import { UsersRepositories } from '../repositories/UserRepositories';

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute(tag_id: string, user_sender: string, user_receiver_email: string, message: string) {
    const complimentRepositories = getCustomRepository(ComplimentsRepositories);
    const userRepositories = getCustomRepository(UsersRepositories);
    const tagsRepositories = getCustomRepository(TagsRepositories);

    const userReceiver = await userRepositories.findOne({ 'email': user_receiver_email });

    if (!userReceiver) {
      throw new Error('User Receiver does not exist');
    }

    if (user_sender === userReceiver.id) {
      throw new Error('Incorrect User Receiver');
    }

    const tag = await tagsRepositories.findOne(tag_id);
    if (!tag) {
      throw new Error('Tag does not exist');
    }

    const compliment = complimentRepositories.create({
      tag,
      userReceiver,
      user_sender,
      message,
    });

    await complimentRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
