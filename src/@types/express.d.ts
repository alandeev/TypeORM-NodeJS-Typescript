interface ITokenDecoded {
  id: string;
}

namespace Express {
  export interface Request {
    user: ITokenDecoded;
  }
}
