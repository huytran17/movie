import mongoose from "mongoose";

import IAdminDb from "./interfaces/admin-db";
import IAdmin from "../interfaces/admin";
import Admin from "../entities/admin";

export default function makeAdminDb({
  adminDbModel,
  moment,
}: {
  adminDbModel: mongoose.Model<
    IAdmin & mongoose.Document,
    Record<string, unknown>
  >;
  moment: any;
}): IAdminDb {
  return new (class MongooseAdminDb implements IAdminDb {})();
}
