import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";

export default function MovieDetailCard({
  data,
  isFavorite,
  changeFavorite,
}: {
  data: MovieDetails | undefined;
  isFavorite: boolean;
  changeFavorite: () => void;
}) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const releaseDate = new Date(data?.release_date!).toLocaleDateString();

  return (
    <div className="text-sm px-2 rounded-xl h-full md:text-2xl bg-opacity-40 bg-tertiary flex flex-col ">
      <h1 className="text-lg  md:text-4xl font-bold">{data?.title}</h1>
      <div className="flex space-x-2 items-center">
        <p>{releaseDate}</p>
        <p>{data?.runtime} min</p>
        <div className="flex space-x-1  text-bYellow items-center">
          <AiFillStar />
          <p>{data?.vote_average.toFixed(1)}</p>
        </div>
      </div>
      <p>
        <span className="text-secondary">Genres:</span>{" "}
        {data?.genres.map((genre) => genre.name).join(", ")}
      </p>
      <p>
        <span className="text-secondary">Budget:</span>{" "}
        {data?.budget ? formatter.format(data.budget) : "Unknown"}
      </p>
      <p>
        <span className="text-secondary">Revenue:</span>
        {data?.revenue ? formatter.format(data.revenue) : "Unknown"}
      </p>
      <p>
        <span className="text-secondary">Tagline:</span>{" "}
        {data?.tagline ? data?.tagline : "Unknown"}
      </p>

      <div className="mt-2 flex space-x-2 items-center">
        <button
          className="bg-secondary text-white rounded-md px-2 pb-1 text-xl md:text-3xl"
          onClick={changeFavorite}
        >
          {isFavorite ? (
            <AiFillHeart className="inline-block" />
          ) : (
            <AiOutlineHeart className="inline-block" />
          )}
        </button>
        <p>{isFavorite ? "Remove Favorite" : "Add Favorite"}</p>
      </div>
    </div>
  );
}
