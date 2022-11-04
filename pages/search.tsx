import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ActivityIndicator from "../components/ActivityIndicator";
import Layout from "../components/Layout";
import MovieCard from "../components/MovieCard";

export default function Search() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  let { name } = router.query as { name: string };
  const searchQuery = useRef<string>("");
  const [queryValue, setQueryValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [queryLoad, setQueryLoad] = useState<boolean>(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  let page = 2;
  let hasMore = true;

  function searchHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    setQueryValue(e.target.value);
    searchQuery.current = e.target.value;

    if (e.target.value.length > 0) {
      setQueryLoad(true);
      clearInterval(searchTimeout);
      setSearchTimeout(
        setTimeout(async () => {
          queryMovies()
            .then((res) => {
              setMovies(res.results);
              page = 2;

              hasMore = res.page < res.total_pages;

              setQueryLoad(() => false);
            })
            .catch((err) => {
              console.log(err);
              setQueryLoad(() => false);
            });
        }, 500)
      );
    } else {
      clearInterval(searchTimeout);
      setQueryLoad(() => false);
      setMovies([]);
    }
  }

  useEffect(() => {
    if (router.isReady) {
      searchQuery.current = name;
      setQueryLoad(true);
      setQueryValue(name);
      queryMovies()
        .then((res) => {
          setMovies(res.results);
          hasMore = res.page < res.total_pages;

          setQueryLoad(() => false);
        })
        .catch((err) => {
          console.log(err);
          setQueryLoad(() => false);
        });
    }
  }, [router.isReady]);

  async function queryMovies(page: number = 1): Promise<MovieFetchData> {
    return fetch(
      `${process.env.BASE_URL}search/movie?api_key=${process.env.API_KEY}&query=${searchQuery.current}&page=${page}`
    ).then((res) => res.json());
  }

  function fetchMoreMovies(): void {
    if (loading) return;
    const bottomLeft =
      document.documentElement.scrollHeight -
      document.documentElement.scrollTop -
      document.documentElement.clientHeight;
    if (bottomLeft > 100) return;
    if (!hasMore) return;

    setLoading(true);

    queryMovies(page)
      .then((res) => {
        setMovies((prev) => moviesNonDuplicate(prev, res.results));
        hasMore = res.page < res.total_pages;
        page++;
        setLoading(() => false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(() => false);
      });
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
        <title>Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-5 md:pt-24 pt-20 flex items-center flex-col  sm:px-10 ">
        <input
          className="w-[65%] md:w-[50%] outline-none bg-tertiary text-white rounded-md h-10 mb-10 px-4"
          value={queryValue}
          onChange={searchHandler}
        />

        {queryLoad ? (
          <div className="w-full h-screen flex justify-center items-center">
            <ActivityIndicator />
          </div>
        ) : (
          <div className="grid   gap-2 md:gap-4 lg:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies?.map((movie: Movie) => (
              <MovieCard key={movie.id} movieData={movie} />
            ))}
          </div>
        )}
        {loading && <ActivityIndicator />}
      </div>
    </Layout>
  );
}

function moviesNonDuplicate(oldArray: Movie[], newArray: Movie[]): Movie[] {
  const filteredNewArray = newArray.filter((newMovie) => {
    return !oldArray.some((oldMovie) => oldMovie.id === newMovie.id);
  });

  return [...oldArray, ...filteredNewArray];
}
