const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow max-w-2xl w-full">
      <div className="px-4 py-5 sm:px-6 text-center">
        <h2 className="font-medium text-lg">{restaurant?.name}</h2>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <p>{restaurant?.description}</p>
      </div>
      <div className="px-4 py-4 sm:px-6 text-center">
        <small className="italic text-gray-700">
          owned by {restaurant?.owner?.full_name}
        </small>
      </div>
    </div>
  );
};

export default RestaurantCard;
