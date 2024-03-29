import { Film, Films } from './film';

export type FilmStore = {
  films: Films,
  film: Film,
  similarFilms: Films,
  promoFilm: Film,
  isDataLoading: boolean,
  sortedFilms: Films,
  genre: string,
  favorite: Films
}
