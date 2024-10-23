import ReactStars from "react-rating-stars-component";
import { useState, useContext } from "react";
import { ArrowUturnDownIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";

import ReplyModal from "../modal/ReplyModal";
import AlertModal from "../modal/AlertModal";
import { UserContext } from "../../context/UserContext";
import { USER_ADMIN } from "../../utils/const";
import api from "../../api/client";

const FeedbackCard = ({ owner, review, getRestaurant }) => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const onSubmit = async () => {
    try {
      const token = localStorage.getItem("jwt");

      await api.delete(`/reviews/${review?.id}/reply`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      getRestaurant();
      setAlertOpen(false);
    } catch (error) {}
  };

  const onOpenReply = () => {
    setOpen(true);
    setUpdate(false);
  };

  const onUpdateReply = () => {
    setOpen(true);
    setUpdate(true);
  };

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
          <div className="mt-5 gap-3">
            <p className="text-gray-400 flex gap-3">
              <ArrowUturnDownIcon className="w-4 h-4 -rotate-90 text-black mt-0.5" />{" "}
              {review?.reply}
            </p>
            {user?.role === USER_ADMIN && (
              <div className="flex gap-3 items-center mt-2">
                <button
                  onClick={onUpdateReply}
                  className="rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                  Edit reply
                </button>
                <button
                  onClick={() => setAlertOpen(true)}
                  className="rounded bg-red-50 px-2 py-1 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100"
                >
                  Delete this reply
                </button>
              </div>
            )}
          </div>
        ) : owner?.id === user?.id ? (
          <button
            onClick={onOpenReply}
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
        reply={review.reply}
        update={update}
        setUpdate={setUpdate}
      />
      <AlertModal
        open={alertOpen}
        setOpen={setAlertOpen}
        title={"Delete reply"}
        description={
          "Are you sure you want to delete this reply? This action cannot be undone."
        }
        onSubmit={onSubmit}
      />
    </>
  );
};

export default FeedbackCard;
