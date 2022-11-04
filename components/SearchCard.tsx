import Link from "next/link";
import { AiFillStar } from "react-icons/ai";

export default function SearchCard({ movieData }: { movieData: Movie }) {
  const posterPath = process.env.IMAGE_BASE! + movieData.poster_path;

  return (
    <Link
      href={"/movie-detail/" + movieData.id + "?title=" + movieData.title}
      className="w-full active:bg-black md:hover:bg-black bg-opacity-20 flex h-24"
    >
      <img src={posterPath} className="h-full object-contain" alt="" />
      <div className="flex flex-col text-left text-white px-2">
        <p className="text-sm md:text-base">{movieData.title}</p>
        <p className="text-xs md:text-base">
          {movieData.release_date.slice(0, 4)}
        </p>
        <div className="flex text-sm space-x-1 text-bYellow items-center">
          <AiFillStar />
          <p>{movieData.vote_average}</p>
        </div>
      </div>
    </Link>
  );
}
