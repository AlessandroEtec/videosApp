export interface ISerieAPI {
  id: number;
  name: string;
  original_name: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string,
  popularity: number;
  vote_average: number;
  poster_path?: string;
  backdrop_path?: string;
  overview: string;
  first_air_date: string,
  vote_count: number,
}

export interface IListaSeries {
  page: number;
  results: ISerieAPI[];
  total_results: number;
  total_pages: number;
}
