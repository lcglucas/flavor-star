import ReactStars from "react-rating-stars-component";
import { useState, useContext } from "react";
import { ArrowUturnDownIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";

import ReplyModal from "../modal/ReplyModal";
import { UserContext } from "../../context/UserContext";

const FeedbackCard = ({ owner, review, getRestaurant }) => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <ReactStars size={35} count={5} value={review?.rating} edit={false} />
        </div>
        <div className="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
          <h6 className="font-semibold text-lg text-indigo-600 ">
            {review?.user?.full_name}
          </h6>
          <p className="font-normal text-gray-400">
            {format(review?.visit_date, "MMM dd, yyyy")}
          </p>
        </div>
        <h3 className="font-semibold text-lg mb-1">{review?.title}</h3>
        <p className="font-normal text-gray-400">{review?.comment}</p>
        {review?.reply ? (
          <div className="mt-5 flex gap-3">
            <p className="text-gray-400 flex gap-3">
              <ArrowUturnDownIcon className="w-4 h-4 -rotate-90 text-black mt-0.5" />{" "}
              {review?.reply}
            </p>
          </div>
        ) : owner?.id === user?.id ? (
          <button
            onClick={() => setOpen(true)}
            className="rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 mt-5"
          >
            Reply this review
          </button>
        ) : null}
      </div>
      <ReplyModal
        open={open}
        setOpen={setOpen}
        getRestaurant={getRestaurant}
        idReview={review.id}
      />
    </>
  );
};

export default FeedbackCard;
