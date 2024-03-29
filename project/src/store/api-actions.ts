import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Film, Films } from '../types/film';
import { APIRoute, AppRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { generatePath } from 'react-router-dom';
import { Comments } from '../types/comment';
import { CommentData } from '../types/comment-data';
import { IsFavoriteData } from '../types/is-favorite-data';
import { redirectToRoute } from './action';

export const fetchFilmsAction = createAsyncThunk<Films, undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'filmData/fetchFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Films>(APIRoute.Films);
    return data;
  },
);

export const fetchSimilarAction = createAsyncThunk<Films, string | undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'filmData/fetchSimilar',
  async (filmId, { extra: api }) => {
    const { data } = await api.get<Films>(generatePath(APIRoute.Similar, { filmId: filmId }));
    return data;
  },
);

export const fetchOneFilmAction = createAsyncThunk<Film, string | undefined, {
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchOneFilm',
  async (filmId, { extra: api }) => {
    const { data } = await api.get<Film>(generatePath(APIRoute.Film, { filmId: filmId }));
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<Film, undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'filmData/fetchPromo',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Film>(APIRoute.Promo);
    return data;
  },
);

export const fetchFavoriteAction = createAsyncThunk<Films, undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'filmData/fetchFavorite',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Films>(APIRoute.Favorite);
    return data;
  },
);

export const sendIsFavoriteAction = createAsyncThunk<Film, IsFavoriteData, {
  state: State,
  extra: AxiosInstance
}>(
  'filmData/postIsFavorite',
  async ({ id, status }, { extra: api }) => {
    const { data } = await api.post<Film>(generatePath(APIRoute.StatusFavorite, { filmId: String(id), status: String(status) }));
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ login: email, password }, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const fetchCommentsAction = createAsyncThunk<Comments, string | undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'comment/fetchComments',
  async (filmId, { extra: api }) => {
    const { data } = await api.get<Comments>(generatePath(APIRoute.Comments, { filmId: filmId }));
    return data;
  },
);

export const sendCommentAction = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'comment/postComment',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    await api.post<Comment>(generatePath(APIRoute.Comments, { filmId: String(id) }), { comment, rating });
    dispatch(redirectToRoute(generatePath(APIRoute.Film, { filmId: String(id) })));
  },
);
