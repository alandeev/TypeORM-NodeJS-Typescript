import { Request, Response } from 'express'; //eslint-disable-line
import CreateSessionService from '../services/CreateSessionService';
import GetUserService from '../services/GetUserService';

class SessionController {
  public async authenticate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const createSessionService = new CreateSessionService();
    const token = await createSessionService.execute(request.body); // preciso fazer puxar token

    return response.json(token);
  }

  public async oauth(request: Request, response: Response): Promise<Response> {
    const getUserService = new GetUserService();
    const user = await getUserService.execute({
      user_id: request.user.id
    });

    return response.json(user);
  }
}

export default SessionController;
