import React, { useEffect, useRef, useState } from "react";
import LoadingIcon from "../components/LoadingIcon";
import quizzes from "../data/quizzes.json";
import { IoTimeOutline } from "react-icons/io5";
import ResultPopup from "../components/ResultPopup";

function Quiz() {
  const [loading, setLoading] = useState(false);
  const optionRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(quizzes?.duration * 60);
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [resultData, setResultData] = useState({
    score: 0,
    answered_questions: 0,
    correct_answer: 0,
    incorrect_answer: 0,
    total_questions: quizzes?.questions_count,
  });

  useEffect(() => {
    setLoading(true);
    setAllQuestions(quizzes?.questions);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (allQuestions.length > 0) {
      const que = allQuestions[0];
      que.idx = 1;
      setCurrentQuestion(que);
    }
  }, [allQuestions, setCurrentQuestion]);

  const handleOptionClick = (index, option) => {
    setSelectedAnswer(option?.id);
    optionRefs.current.forEach((ref, i) => {
      if (i === index) {
        ref.checked = !ref.checked;
      } else {
        ref.checked = false;
      }
    });
    if (option?.is_correct) {
      setResultData((prev) => ({
        ...prev,
        score: prev.score + 4,
        correct_answer: prev.correct_answer + 1,
        answered_questions: prev.answered_questions + 1,
      }));
    } else {
      setResultData((prev) => ({
        ...prev,
        score: prev.score - 1,
        incorrect_answer: prev.incorrect_answer + 1,
        answered_questions: prev.answered_questions + 1,
      }));
    }
    const timeout = setTimeout(() => {
      nextQueSetup();
    }, 1000);

    return () => clearTimeout(timeout); // Cleanup function
  };

  const nextQueSetup = async () => {
    if (allQuestions[allQuestions.length - 1].id === currentQuestion.id) {
      setShowResultPopup(true);
    }
    clearOptions();
    let currentQuestionIndex = 0;
    for (let i = 0; i < allQuestions.length; i++) {
      if (allQuestions[i].id === currentQuestion.id) {
        currentQuestionIndex = i;
      }
    }
    const newQueId = (currentQuestionIndex + 1) % allQuestions.length;
    const que = allQuestions[newQueId];
    que.idx = newQueId + 1;
    setCurrentQuestion(que);
  };

  const clearOptions = async () => {
    optionRefs.current.forEach((ref) => {
      ref.checked = false;
    });
    setSelectedAnswer(0);
  };

  // Timer Functions
  useEffect(() => {
    if (timeLeft <= 0) {
      autoSubmitResult(); //  Auto Submit
      return;
    }

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerInterval); // Cleanup function
  }, [timeLeft]);

  // **Auto Submit Function**
  const autoSubmitResult = async () => {
    setShowResultPopup(true);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <>
      <div>
        {loading && <LoadingIcon />}
        {showResultPopup && <ResultPopup data={resultData} />}

        {/* {console.log("currentQuestion", currentQuestion)} */}
        <div className="flex h-screen justify-center items-center">
          <div className="p-5 border rounded">
            {allQuestions.length > 0 ? (
              <div>
                {/* Number of Quiz and Time Showing here... */}
                <div className="p-3 relative">
                  {/* Timer */}
                  <div className="flex gap-1 items-center text-gray-500 absolute -top-2 right-0">
                    <IoTimeOutline className="text-xl" />
                    <div className="font-medium text-xl">
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                </div>
                {/* Questions and Answers Showing here... */}
                <div className="flex flex-col gap-5 pb-4">
                  <div className="flex items-center gap-2">
                    {/* Number of Question */}
                    <div
                      className={`inline-block p-5 border-2 rounded-full relative -z-10 border-gray-500 bg-gray-500 text-white`}
                    >
                      <p className="text-lg font-medium absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        {currentQuestion?.idx}
                      </p>
                    </div>
                    {/* Question */}
                    <div>
                      <h1 className="text-sm sm:text-lg font-medium">
                        {currentQuestion?.description}
                      </h1>
                    </div>
                  </div>
                  {/* Answers: (Options) */}
                  <div className="flex flex-col gap-2">
                    <div className="w-full flex flex-col gap-3">
                      {currentQuestion?.options?.map((option, index) => (
                        <div
                          key={option.id}
                          className={`w-full flex items-center gap-2 p-3 border-2 rounded cursor-pointer ${
                            selectedAnswer === option.id
                              ? "border-blue-400"
                              : "border-gray-200"
                          }`}
                          onClick={() => {
                            handleOptionClick(index, option);
                          }}
                        >
                          <p
                            className={`${
                              selectedAnswer === option.id
                                ? "text-blue-400"
                                : "text-gray-500"
                            } italic`}
                          >{`${index + 1}.`}</p>
                          <input
                            type="checkbox"
                            ref={(el) => (optionRefs.current[index] = el)}
                            className="hidden"
                            readOnly
                          />
                          <h3 className="text-lg">{option?.description}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        autoSubmitResult();
                      }}
                      className="w-1/2 sm:w-2/6 px-4 py-2 border-2 border-blue-500 font-medium bg-blue-500 text-white rounded"
                    >
                      Show Result
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center w-full h-screen p-5">
                <h1 className="text-2xl font-bold">No Question Found</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
