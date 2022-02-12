import mongoose from "mongoose";

import IUserDb, { PaginatedUserResult } from "./interfaces/user-db";
import User from "../entities/user";
import IUser from "../interfaces/user";

export default function makeUserDb({
  userDbModel,
  moment,
}: {
  userDbModel: mongoose.Model<
    IUser & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IUserDb {
  return new (class MongooseUserDb implements IUserDb {
    async findAll(): Promise<User[] | null> {
      return null;
    }

    async insert(payload: Partial<IUser>): Promise<User | null> {
      const result = await userDbModel.create([payload]);

      const updated = await userDbModel
        .findOne({ _id: result[0]?._id })
        .lean({ virtuals: true });
      if (updated) {
        return new User(updated);
      }
      return null;
    }

    async findOne(): Promise<User | null> {
      const existing = await userDbModel.findOne();

      if (existing) {
        return new User(existing);
      }

      return null;
    }
  })();
}
