import Head from "next/head";
import Layout from "../components/Layout";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import ActivityIndicator from "../components/ActivityIndicator";

export default function Home({ movieRes }: { movieRes: MovieFetchData }) {
  const [movies, setMovies] = useState<Movie[]>(movieRes.results);
  const [page, setPage] = useState<number>(2);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  let canFetch = true;

  async function fetchMoreMovies(): Promise<void> {
    if (!canFetch) return;
    const bottomLeft =
      document.documentElement.scrollHeight -
      document.documentElement.scrollTop -
      document.documentElement.clientHeight;
    if (bottomLeft > 0) return;
    if (!hasMore) return;

    setLoading(true);
    const res = await fetchPopularMovies(page);
    setMovies((prev) => [...prev, ...res.results]);
    setPage((prev) => prev + 1);
    setHasMore(res.page < res.total_pages);
    setLoading(false);
  }

  useEffect(() => {
    addEventListener("scroll", fetchMoreMovies);

    return () => {
      removeEventListener("scroll", fetchMoreMovies);
    };
  }, []);

  return (
    <Layout>
      <Head>
        <title>Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-5 sm:px-10 ">
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
    `https://api.themoviedb.org/3/movie/popular?api_key=${"d6fed4670aa352a741511d46408354ab"}&page=${page}`
  ).then((res) => res.json());
}

export const getServerSideProps = async () => {
  const data = await fetchPopularMovies();

  if (data) {
    return {
      props: {
        movieRes: data,
      },
    };
  }
};
