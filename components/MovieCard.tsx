import Image from "next/image";
import Link from "next/link";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function MovieCard({ movieData }: { movieData: Movie }) {
  return (
    <div>
      <Link
        href={"/movie-detail/" + movieData.id + "?title=" + movieData.title}
        className="flex group  rounded-xl overflow-hidden  relative active:scale-[0.98] flex-col "
      >
        <div className="absolute w-full h-full   group-hover:flex hidden backdrop-blur-2xl z-10  text-xs text-center p-2 text-white">
          {movieData.overview.slice(0, 200) + "..."}
        </div>
        <div className="flex truncate z-10 px-4 text-white flex-col absolute bottom-0 w-full bg-black bg-opacity-70 pt-1 pb-3">
          <div className="flex justify-between items-center">
            <p>{movieData.release_date.slice(0, 4)}</p>

            <div className="flex space-x-1 text-bYellow items-center">
              <AiFillStar />
              <p>{movieData.vote_average}</p>
            </div>
          </div>
          <p className="w-full truncate">{movieData.title}</p>
        </div>
        <img
          src={process.env.IMAGE_BASE + movieData.poster_path}
          alt=""
          className="object-contain w-full group-hover:backdrop-blur-3xl"
          loading="lazy"
        />
      </Link>
    </div>
  );
}
