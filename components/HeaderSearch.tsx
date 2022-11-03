import React, { ChangeEventHandler, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function HeaderSearch() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  let searchTimeout: NodeJS.Timeout;

  function toggleSearchAndFocus(): void {
    if (!searchOpen) {
      setSearchOpen(true);
      inputRef.current?.focus();
    } else {
      setSearchOpen(false);
      inputRef.current?.blur();
    }
  }

  function searchHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      setLoading(true);
      clearInterval(searchTimeout);
      searchTimeout = setTimeout(async () => {
        const res = await fetch(
          `${process.env.BASE_URL}search/movie?api_key=${process.env.API_KEY}&query=${e.target.value}`
        ).then((res) => res.json());

        setMovies(res.results.slice(0, 2));

        setLoading(false);
      }, 500);
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
            (searchOpen && "w-36 md:w-52 lg:w-72 px-2 ")
          }
        ></input>
      </div>
      <div
        className={
          "w-full flex flex-col items-center h-0 top-8 md:top-10 z-[1] transition-all  bg-tertiary bg-opacity-90 overflow-hidden rounded-b-3xl duration-150 absolute " +
          (searchQuery.length > 0 && "h-64 border border-secondary")
        }
      >
        <div className="w-full h-24 bg-red-400"></div>
        <div className="w-full h-24 bg-blue-400"></div>
        <button className="w-[60%] text-base rounded-lg h-10 mt-2 bg-red-400">
          Daha fazla sonuç
        </button>
      </div>
    </div>
  );
}
