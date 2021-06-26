import { Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../service/ListUserReceiveComplimentsService"

class ListUserReceiveComplimentController {

    async handle(request: Request, response: Response) {
        const { user_id } = request;
        
        const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService();

        const compliments = await listUserReceiveComplimentsService.execute(user_id)

        return response.json(compliments);
    }
}

export { ListUserReceiveComplimentController }