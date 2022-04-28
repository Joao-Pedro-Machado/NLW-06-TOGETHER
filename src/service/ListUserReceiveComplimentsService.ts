import { classToPlain } from 'class-transformer';
import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { TagsRepositories } from '../repositories/TagsRepositories';

class ListUserReceiveComplimentsService {

    async execute(user_id: string) {
        const complimentRepositories = getCustomRepository(ComplimentsRepositories)
        const tagsRepositories = getCustomRepository(TagsRepositories)

        let compliments = await complimentRepositories.find({
            where: {
                user_receiver: user_id
            },
            relations: ["userSender", "userReceiver", "tag"]
        });

        return classToPlain(compliments);
    }
}

export { ListUserReceiveComplimentsService }