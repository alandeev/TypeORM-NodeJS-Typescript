import { Request, Response } from 'express'; //eslint-disable-line
import CreateSessionService from '../services/CreateUserService';

class SessionController {
  public async authenticate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const createSessionService = new CreateSessionService();
    const user = await createSessionService.execute(request.body); // preciso fazer puxar token

    return response.json(user);
  }
}

export default SessionController;
