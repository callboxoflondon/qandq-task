import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ActivityIndicator from "../../components/ActivityIndicator";
import Layout from "../../components/Layout";
import MovieDetailCard from "../../components/MovieDetailCard";
import MovieDetailForms from "../../components/MovieDetailForms";

type UnionQueryType = {
  movieId: string | string[] | undefined;
  title: string | string[] | undefined;
};

export default function MovieDetail() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<MovieDetails | undefined>(undefined);
  const { movieId, title } = router.query as UnionQueryType;
  const url = router.asPath;

  useEffect(() => {
    if (router.isReady && movieId) {
      setFavorites(JSON.parse(localStorage.getItem("favorites") || "[]"));
      getMovieDetail();
    }
  }, [router.isReady, movieId]);

  function getMovieDetail(): void {
    setIsLoading(true);
    fetch(
      `${process.env.BASE_URL}movie/${movieId}?api_key=${process.env.API_KEY}`
    )
      .then(async (res) => {
        const result = await res.json();
        setData(result);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  function changeFavorite() {
    if (isFavorite) {
      setFavorites((oldFavs) => {
        let newFavs = oldFavs.filter((fav) => fav !== movieId);
        localStorage.setItem("favorites", JSON.stringify(newFavs));
        return newFavs;
      });
    } else {
      setFavorites((oldFavs) => {
        let newFaws = [...oldFavs, movieId as string];
        localStorage.setItem("favorites", JSON.stringify(newFaws));
        return newFaws;
      });
    }
  }

  const backdropPath = process.env.BACKDROP_IMAGE_BASE! + data?.backdrop_path;
  const posterPath = process.env.IMAGE_BASE! + data?.poster_path;
  const isFavorite = favorites.includes(movieId as string);

  if (isLoading || !router.isReady) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <ActivityIndicator />
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={"bg-center  w-full min-h-[100vh] bg-no-repeat bg-cover "}
        style={{
          backgroundImage: `url(${backdropPath})`,
        }}
      >
        <div className="backdrop-brightness-[0.2] h-screen flex justify-center text-white w-full  px-2  md:px-10  md:pt-24 pt-20 ">
          <div className="flex overflow-y-auto pb-10 scrollbar-hide flex-col xmd:max-w-[80%] md:max-w-[70%] lg:max-w-[50%]">
            <div className=" justify-center items-start flex space-x-4  ">
              <img
                src={posterPath}
                className="h-56 md:h-72 object-contain bg-red-400  rounded-xl opacity-70"
                alt=""
              />
              <MovieDetailCard
                data={data}
                isFavorite={isFavorite}
                changeFavorite={changeFavorite}
              />
            </div>

            <div className="mt-2 flex  flex-col">
              <p className="text-xs md:text-lg">
                <span className="text-secondary  ">Overview:</span>{" "}
                {data?.overview}
              </p>
              <MovieDetailForms movieId={movieId as string} url={url} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
