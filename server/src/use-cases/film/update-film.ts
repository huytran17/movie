import Film from "../../entities/film";
import IFilmDb from "../../data-access/interfaces/film-db";
import IFilm from "../../interfaces/film";
import { ClientSession } from "mongoose";
import _ from "lodash";

interface IUpdateFilmData {
  filmDetails: Partial<IFilm>;
  update_password?: boolean;
}
export type IUpdateFilm = ({
  filmDetails,
  update_password,
}: IUpdateFilmData) => Promise<Film | null>;

export default function makeUpdateFilm(filmDb: IFilmDb): IUpdateFilm {
  return async function updateFilm({
    filmDetails,
    update_password = false,
  }: IUpdateFilmData): Promise<Film | null> {
    const existing_by_id = await filmDb.findById({
      id: filmDetails._id as string,
    });
    const existing = existing_by_id;

    if (!existing) {
      throw new RangeError("Film not found.");
    }

    const omit_list = ["_id"];

    const final_film_detail = _.omit(filmDetails, omit_list);
    const film = new Film(
      Object.assign({}, existing, final_film_detail, {
        updated_at: new Date(),
      })
    );

    const updatedFilm = await filmDb.update(film);
    return updatedFilm;
  };
}
