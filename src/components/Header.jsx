import React from "react";
import testline from "../assets/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="w-full sticky top-0 py-3 px-5 border-b bg-slate-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Link to={"/"}>
            <img src={testline} alt="Logo" className="h-7 w-28" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
