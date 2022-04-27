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
        });

        compliments.map(async compliment => {
            const tag = await tagsRepositories.findOne({
                where: {
                    id: compliment.tag_id
                }
            })

            compliment.tag = tag

            console.log(compliment);            
        })

        return compliments;
    }
}

export { ListUserReceiveComplimentsService }