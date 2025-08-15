declare namespace Express {
  export interface Request {
    user: { id: string; username: string; profile: string; companyId: number };
  }
}
