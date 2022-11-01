interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  adult: boolean;
  overview: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
  backdrop_path: string;
}

interface MovieFetchData {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
