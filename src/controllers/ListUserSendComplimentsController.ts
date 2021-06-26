import { Request, Response } from "express";
import { ListUserSendComplimentsService } from "../service/ListUserSendComplimentsService";


class ListUserSendComplimentController {

    async handle(request: Request, response: Response) {
        const { user_id } = request;
        
        const listUserSendComplimentsService = new ListUserSendComplimentsService();

        const compliments = await listUserSendComplimentsService.execute(user_id)
    }
}

export { ListUserSendComplimentController }