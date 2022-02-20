import User from "../../entities/user";
import IUser from "../../interfaces/user";
import { ClientSession } from "mongoose";

export default interface IUserDb {
  findAll: () => Promise<IUser[] | null>;
  findOne: () => Promise<User | null>;
  findById: ({ id }: { id: string }) => Promise<User | null>;
  findByEmail: ({ email }: { email: string }) => Promise<User | null>;
  insert: (
    payload: Partial<IUser>,
    options?: { session?: ClientSession }
  ) => Promise<User | null>;
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
