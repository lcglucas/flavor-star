import ReactStars from "react-rating-stars-component";
import { format } from "date-fns";

const FeedbackCard = ({ review }) => {
  return (
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
    </div>
  );
};

export default FeedbackCard;
