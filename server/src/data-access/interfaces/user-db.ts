import User from "../../entities/user";
import IUser from "../../interfaces/user";

export default interface IUserDb {
  findAll: () => Promise<IUser[] | null>;
  findOne: () => Promise<User | null>;
  insert: (payload: Partial<IUser>) => Promise<User | null>;
}

export interface PaginatedUserResult {
  data: User[];
  pagination: {
    current_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}
