"use client";
import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

function Footer() {
  const [like, setLike] = useState(false);

  return (
    <footer className="border-t fixed w-full  bottom-0 z-0">
      <p className="text-center text-gray-500 p-5 fill-red-500 bg-slate-300">
        Copyright ©2025 All rights reserved | This site is made with{" "}
        <span onClick={() => setLike(!like)} className="cursor-pointer">
          <AiFillHeart
            className={`inline ${like ? "fill-red-500" : "fill-gray-500"}`}
          />
          <span> by </span>
          <a
            href="https://testline.in/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline font-semibold"
          >
            Testline
          </a>
        </span>
      </p>
    </footer>
  );
}

export default Footer;
