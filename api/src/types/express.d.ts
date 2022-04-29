interface RequestUser {
  _id: string,
}

declare namespace Express {
  export interface Request {
    _user?: RequestUser,
    user?: object,
  }
}