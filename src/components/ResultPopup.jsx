import React from "react";
import { GiTrophyCup } from "react-icons/gi";

function ResultPopup({ data, setShowResult }) {
  return (
    <div>
      <div className="fixed inset-0 w-full h-screen z-10">
        {setShowResult ? (
          <div
            className="bg-black w-full h-full opacity-80 z-20"
            onClick={() => setShowResult(false)}
          ></div>
        ) : (
          <div className="bg-black w-full h-full opacity-90 z-20"></div>
        )}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full px-5">
          <div className="bg-white rounded w-full sm:w-1/2 lg:w-1/3 m-auto h-auto">
            <div className="p-3 border-b-2 rounded-t bg-gray-100">
              <div className="flex justify-center items-center">
                <GiTrophyCup className="text-3xl text-green-500" />
                <h1 className="text-2xl text-green-500 font-semibold">
                  Result
                </h1>
              </div>
              <ul className="text-center flex flex-col gap-2">
                <li className="text-xl">You have completed the quiz!</li>
                <li className="text-xl font-semibold">
                  Final Score: {data?.score}
                </li>
                <li>
                  <ul className="flex justify-center gap-2">
                    <li className="text-sm text-green-900">
                      Correct Answer: {data?.correct_answer}
                    </li>
                    <li className="text-sm text-red-900">
                      Incorrect Answer: {data?.incorrect_answer}
                    </li>
                  </ul>
                </li>
                <li className="text-xl">{`You answered ${data?.answered_questions} out of ${data?.total_questions} questions`}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPopup;
