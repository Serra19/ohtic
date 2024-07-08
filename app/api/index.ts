import axios, { AxiosRequestConfig } from "axios";


export const getClient = (config?: AxiosRequestConfig) => {
  const client = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    ...config,
    timeout: 30000,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWMwZWQ2NTNkMjc0MDMyZDJmNTdmYzg2ZDI5MmRiYyIsIm5iZiI6MTcyMDExNDQ3My44OTcxMDYsInN1YiI6IjVjNGQwZmY5MGUwYTI2M2NjZGQ0NzM0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vj_Fblu2cKrimrnXsNuCMI4KggwUzGGT0p9cEddHzsg'
    },
  });

  return client;
}

export const getPopularMovies = async (page: number = 1) => {
  const client = getClient();
  const { data } = await client.get(`/movie/popular?language=es-ES&page=${page}`);

  return data;
}

export const getMovieDetails = async (id: number) => {
  const client = getClient();
  const { data } = await client.get(`/movie/${id}?language=es-ES`);

  return data;
}

export const getMovieCredits = async (id: number) => {
  const client = getClient();
  const { data } = await client.get(`/movie/${id}/credits?language=es-ES`);

  return data;
}

export const getPopularTvSeries = async (page: number = 1) => {
  const client = getClient();
  const { data } = await client.get(`/tv/popular?language=es-ES&page=${page}`);

  return data;
}

export const getTvSerieDetails = async (id: number) => {
  const client = getClient();
  const { data } = await client.get(`/tv/${id}?language=es-ES`);

  return data;
}

export const getTvSerieCredits = async (id: number) => {
  const client = getClient();
  const { data } = await client.get(`/tv/${id}/credits?language=es-ES`);

  return data;
}

export const search = async (query: string) => {
  const client = getClient();
  const { data } = await client.get(`/search/multi?language=es-ES&query=${query}`);

  return data;
}