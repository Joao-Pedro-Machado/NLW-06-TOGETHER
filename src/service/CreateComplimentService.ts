import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { TagsRepositories } from '../repositories/TagsRepositories';
import { UsersRepositories } from "../repositories/UserRepositories"



interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {

    async execute({tag_id, user_sender, user_receiver, message}) {
        const complimentRepositories = getCustomRepository(ComplimentsRepositories)
        const userRepositories = getCustomRepository(UsersRepositories)
        const tagsRepositories = getCustomRepository(TagsRepositories)

        
        if(user_sender === user_receiver) {
            throw new Error("Incorrect User Receiver")
        }

        const userReceiverExists = await userRepositories.findOne(user_receiver)

        if(!userReceiverExists) {
            throw new Error("User Receiver does not exist")
        }

        const tag = await tagsRepositories.findOne(tag_id)
        if(!tag) {
            throw new Error("Tag does not exist")
        }

        const compliment = complimentRepositories.create({
            tag,
            user_receiver,
            user_sender,
            message
        })

        await complimentRepositories.save(compliment)
        
        return compliment
    }
}

export { CreateComplimentService }