import Head from "next/head";
import Layout from "../components/Layout";
import MovieCard from "../components/MovieCard";
import { useEffect, useRef, useState } from "react";
import ActivityIndicator from "../components/ActivityIndicator";

export default function Home({ movieRes }: { movieRes: MovieFetchData }) {
  const [movies, setMovies] = useState<Movie[]>(movieRes.results);
  let page = 2;
  let hasMore = movieRes.page < movieRes.total_pages;
  const [loading, setLoading] = useState<boolean>(false);

  function fetchMoreMovies(): void {
    if (loading) return;
    const bottomLeft =
      document.documentElement.scrollHeight -
      document.documentElement.scrollTop -
      document.documentElement.clientHeight;
    if (bottomLeft > 100) return;
    if (!hasMore) return;

    setLoading(true);

    fetchPopularMovies(page).then((res) => {
      setMovies((prev) => moviesNonDuplicate(prev, res.results));
      hasMore = res.page < res.total_pages;
      page++;
      setLoading(() => false);
    });
  }

  useEffect(() => {
    addEventListener("scroll", fetchMoreMovies);

    return () => {
      removeEventListener("scroll", fetchMoreMovies);
    };
  }, []);

  function moviesNonDuplicate(oldArray: Movie[], newArray: Movie[]): Movie[] {
    const filteredNewArray = newArray.filter((newMovie) => {
      return !oldArray.some((oldMovie) => oldMovie.id === newMovie.id);
    });

    return [...oldArray, ...filteredNewArray];
  }

  return (
    <Layout>
      <Head>
        <title>Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-5 md:pt-24 pt-20  sm:px-10 ">
        <div className="grid   gap-2 md:gap-4 lg:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies?.map((movie: Movie) => (
            <MovieCard key={movie.id} movieData={movie} />
          ))}
        </div>
        {loading && <ActivityIndicator />}
      </div>
    </Layout>
  );
}

async function fetchPopularMovies(page: number = 1): Promise<MovieFetchData> {
  return fetch(
    `${process.env.BASE_URL}movie/popular?api_key=${process.env.API_KEY}&page=${page}`
  ).then((res) => res.json());
}

export const getServerSideProps = async () => {
  const data = await fetchPopularMovies();

  return {
    props: {
      movieRes: data,
    },
  };
};
