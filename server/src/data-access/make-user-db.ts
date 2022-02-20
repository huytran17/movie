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
    /**
     *
     * @returns find all
     */
    async findAll(): Promise<User[] | null> {
      return null;
    }
    /**
     * insert new record
     * @param payload
     * @returns
     */
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
    /**
     * find by id
     * @param param0
     * @returns
     */
    async findById({ id }: { id: string }): Promise<User | null> {
      const existing = await userDbModel
        .findOne({ _id: id })
        .lean({ virtuals: true });

      if (existing) {
        return new User(existing);
      }

      return null;
    }

    /**
     * find one record
     * @returns
     */
    async findOne(): Promise<User | null> {
      const existing = await userDbModel.findOne().lean({ virtuals: true });

      if (existing) {
        return new User(existing);
      }

      return null;
    }

    /**
     * find by email
     * @param param0
     * @returns
     */
    async findByEmail({ email }: { email: string }): Promise<User | null> {
      const existing = await userDbModel
        .findOne({ email })
        .lean({ virtuals: true });

      if (existing) {
        return new User(existing);
      }

      return null;
    }
  })();
}
