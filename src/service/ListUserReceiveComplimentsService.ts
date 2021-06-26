import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UserRepositories"



class ListUserReceiveComplimentsService {

    async execute(user_id: string){
        const complimentRepositories = getCustomRepository(ComplimentsRepositories)

        const compliments = await complimentRepositories.find({
            where: {
                user_receiver: user_id
            },
        });

        return compliments;
    }
}

export { ListUserReceiveComplimentsService }