import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEventHandler, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ActivityIndicator from "./ActivityIndicator";
import SearchCard from "./SearchCard";

export default function HeaderSearch() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

  function toggleSearchAndFocus(): void {
    if (!searchOpen) {
      setSearchOpen(true);
      inputRef.current?.focus();
    } else {
      setSearchOpen(false);
      setMovies([]);
      setSearchQuery("");
      inputRef.current?.blur();
    }
  }

  function searchHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      setLoading(true);
      clearInterval(searchTimeout);
      setSearchTimeout(
        setTimeout(async () => {
          fetch(
            `${process.env.BASE_URL}search/movie?api_key=${process.env.API_KEY}&query=${e.target.value}`
          )
            .then(async (res) => {
              const result = await res.json();
              setMovies(result?.results ? result?.results.slice(0, 2) : []);
              setLoading(false);

              console.log(result);
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        }, 500)
      );
    } else {
      clearInterval(searchTimeout);
    }
  }

  return (
    <div className="flex relative items-stretch flex-col">
      <div
        className={
          "border border-secondary rounded-3xl transition-all duration-500  pl-2 flex h-8 md:h-10 " +
          (searchOpen && "overflow-hidden ") +
          (searchQuery.length > 0 && "rounded-b-none")
        }
      >
        <button className="focus:outline-none" onClick={toggleSearchAndFocus}>
          <FaSearch />
        </button>
        <input
          ref={inputRef}
          placeholder={"Enter a movie name"}
          value={searchQuery}
          onChange={searchHandler}
          className={
            "w-0 text-xs  md:text-base text-white transition-all duration-500  flex bg-opacity-50 focus:outline-none bg-tertiary ml-2  " +
            (searchOpen && " w-40 md:w-52 lg:w-72 px-2 ")
          }
        ></input>
      </div>
      <div
        className={
          "w-full flex h-0  justify-center items-center  top-8 md:top-10 z-[1] transition-all  bg-tertiary bg-opacity-90 overflow-hidden rounded-b-3xl duration-150 absolute " +
          (searchQuery.length > 0 && "h-64 border  border-secondary")
        }
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <div className="w-full flex flex-col z-10 items-center space-y-2">
            {movies.map((movie) => (
              <SearchCard key={movie.id} movieData={movie} />
            ))}

            {movies.length === 0 && "Sonuç bulunamadı"}

            <Link
              href={"/search?name=" + searchQuery}
              className="w-[60%] text-base  rounded-lg py-2  text-center text  bg-secondary text-white"
            >
              More...
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
