import ReactStars from "react-rating-stars-component";

import Link from "../ui/Link";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow max-w-2xl w-full">
      <div className="p-6 flex justify-between items-center">
        <h2 className="font-medium text-lg">
          <Link to={`/restaurants/${restaurant?.id}`}>{restaurant?.name}</Link>
        </h2>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium mt-1">
              {restaurant?.average}
            </span>
            <ReactStars
              size={20}
              count={5}
              value={restaurant?.average}
              edit={false}
            />
          </div>
          <small className="text-xs italic">
            {restaurant?.reviews_count} reviews
          </small>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <p>{restaurant?.description}</p>
      </div>
      <div className="px-4 py-4 sm:px-6 text-center flex flex-col gap-3">
        <small className="italic text-gray-700">
          owned by {restaurant?.owner?.full_name}
        </small>
      </div>
    </div>
  );
};

export default RestaurantCard;
