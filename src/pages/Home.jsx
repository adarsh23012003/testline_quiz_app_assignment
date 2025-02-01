import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full px-5">
        <div className="bg-white rounded w-full sm:w-1/2 lg:w-1/3 m-auto h-auto border-2 shadow-sm p-5">
          <h1 className="text-2xl font-semibold text-center pb-3">
            Welcome to Testline Quiz App
          </h1>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="font-semibold mb-2 text-lg text-gray-800">
              Quick Rules:
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>10 questions per quiz</li>
              <li>Time limit: 15 minutes</li>
              <li>Negative marking</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Link
              to={"/quiz"}
              className="px-4 py-2 border-2 border-blue-500 font-medium bg-blue-500 text-white rounded"
            >
              Start Quiz
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
