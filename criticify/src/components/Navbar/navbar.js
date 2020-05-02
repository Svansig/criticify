import React, { useState } from "react";
import Player from "../Player/player";
import { useSelector } from "react-redux";
import { playHere } from "../Player/Controls";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const current = useSelector((state) => state.currentSong);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-200 bg-opacity-100 opacity-100 p-4 z-50">
      <div className="lg:w-3/4 lg:mx-auto flex flew-row justify-between">
        <div className="flex flew-row ">
          <Link
            className="items-center text-gray-800 mr-10 my-auto text-4xl"
            to="/"
          >
            C
          </Link>
          <div onClick={playHere} className="my-auto ">
            Play
          </div>
          <div className="flex flex-row mx-6 text-xl my-auto">
            <img
              alt=""
              src={current.albumURL}
              className=" h-16 w-1/2 object-cover object-center mr-6"
            ></img>
            <div>
              <div className="text-gray-800 font-bold">{current.title}</div>
              <div className="text-gray-700 font-hairline">
                {current.artist}
              </div>
            </div>
          </div>

          <div className={isOpen ? "block" : "hidden"}>
            <Player />
          </div>
        </div>
        <div className="my-auto">
          <div className="w-full block flex-grow " onClick={toggle}>
            ENVOXE
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
