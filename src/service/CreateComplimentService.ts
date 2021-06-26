import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
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

        
        if(user_sender === user_receiver) {
            throw new Error("Incorrect User Receiver")
        }

        const userReceiverExists = await userRepositories.findOne(user_receiver)

        if(!userReceiverExists) {
            throw new Error("User Receiver does not exist")
        }

        const compliment = complimentRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        })
        //8214ed76-563c-4584-ba4a-2f3b7de5acc4

        await complimentRepositories.save(compliment)
        
        return compliment
    }
}

export { CreateComplimentService }