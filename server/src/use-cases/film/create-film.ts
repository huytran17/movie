import Film from "../../entities/film";
import IFilm from "../../interfaces/film";
import IFilmDb from "../../data-access/interfaces/film-db";

export interface ICreateFilmData {
  filmDetails: Omit<IFilm, "_id">;
}

export type ICreateFilm = ({
  filmDetails,
}: ICreateFilmData) => Promise<Film | null>;

export default function makeCreateFilm(filmDb: IFilmDb): ICreateFilm {
  return async function createFilm({
    filmDetails,
  }: ICreateFilmData): Promise<Film | null> {
    const createdFilm = await filmDb.insert(filmDetails);
    return createdFilm;
  };
}
