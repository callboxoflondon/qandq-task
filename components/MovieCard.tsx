import Link from "next/link";
import { AiFillStar } from "react-icons/ai";

export default function MovieCard({ movieData }: { movieData: Movie }) {
  return (
    <div>
      <Link
        href={"/movie-detail/" + movieData.id + "?title=" + movieData.title}
        className="flex group w-full h-full  rounded-xl overflow-hidden  relative active:scale-[0.98] flex-col "
      >
        <div className="absolute w-full h-full   group-hover:flex hidden backdrop-blur-2xl z-10  text-xs text-center p-2 text-white">
          {movieData.overview
            ? movieData.overview.slice(0, 200) + "..."
            : "No overview"}
        </div>
        <div className="flex truncate z-10 px-4 text-white flex-col absolute bottom-0 w-full bg-black bg-opacity-70 pt-1 pb-3">
          <div className="flex justify-between items-center">
            <p>
              {movieData.release_date
                ? movieData.release_date.slice(0, 4)
                : "Unknown"}
            </p>

            <div className="flex space-x-1 text-bYellow items-center">
              <AiFillStar />
              <p>{movieData.vote_average}</p>
            </div>
          </div>
          <p className="w-full truncate">{movieData.title}</p>
        </div>
        {movieData.poster_path ? (
          <img
            src={process.env.IMAGE_BASE + movieData.poster_path}
            alt=""
            className=" w-full aspect-[2/3] group-hover:backdrop-blur-3xl"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-black bg-opacity-70 flex items-center justify-center text-white text-2xl">
            No poster
          </div>
        )}
      </Link>
    </div>
  );
}
