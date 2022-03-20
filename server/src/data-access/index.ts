import moment from "moment";
import makeUserDb from "./make-user-db";
import makeAdminDb from "./make-admin-db";
import makeFilmDb from "./make-film-db";

import { UserModel, AdminModel, FilmModel } from "../models";

const UserDb = makeUserDb({ userDbModel: UserModel, moment });
const AdminDb = makeAdminDb({ adminDbModel: AdminModel, moment });
const FilmDb = makeFilmDb({ filmDbModel: FilmModel, moment });

export default Object.freeze({
  UserDb,
  AdminDb,
  FilmDb,
});
export { UserDb, AdminDb, FilmDb };
