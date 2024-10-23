import ReactStars from "react-rating-stars-component";
import { useEffect, useState, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../components/ui/Layout";
import FeedbackModal from "../../components/modal/FeedbackModal";
import Button from "../../components/ui/Button";
import FeedbackCard from "../../components/restaurant/FeedbackCard";
import api from "../../api/client";
import { UserContext } from "../../context/UserContext";
import { USER_REGULAR } from "../../utils/const";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

const Restaurant = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [open, setOpen] = useState(false);

  const getRestaurant = useCallback(async () => {
    try {
      setRestaurant(null);

      const token = localStorage.getItem("jwt");

      const { data } = await api.get(`/restaurants/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRestaurant(data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getRestaurant();
  }, [getRestaurant]);

  if (!restaurant) {
    return <LoadingOverlay />;
  }

  return (
    <Layout>
      <section className="relative bg-white p-6 rounded-lg shadow">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <div className="w-full">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-bold text-3xl text-black">
                {restaurant?.name}
              </h2>
              {user?.role === USER_REGULAR && (
                <Button onClick={() => setOpen(true)} className="w-auto">
                  Leave a review
                </Button>
              )}
            </div>
            <div className="p-8 bg-amber-50 rounded-3xl flex items-center justify-center flex-col">
              <h2 className="font-bold text-5xl text-amber-400">
                {restaurant?.average}
              </h2>
              <div className="flex items-center justify-center gap-2 sm:gap-6">
                <ReactStars
                  size={50}
                  count={5}
                  value={restaurant?.average}
                  edit={false}
                />
              </div>
              <p className="font-medium text-xl leading-8 text-gray-900 text-center">
                {restaurant?.reviews?.length === 0
                  ? "0 Ratings"
                  : restaurant?.reviews?.length === 1
                    ? "1 Rating"
                    : `${restaurant?.reviews?.length} Ratings`}
              </p>
            </div>
            {restaurant?.reviews?.map((review) => (
              <FeedbackCard
                owner={restaurant?.owner}
                key={review?.id}
                review={review}
                getRestaurant={getRestaurant}
              />
            ))}
          </div>
        </div>
      </section>
      <FeedbackModal
        open={open}
        setOpen={setOpen}
        getRestaurant={getRestaurant}
      />
    </Layout>
  );
};

export default Restaurant;
