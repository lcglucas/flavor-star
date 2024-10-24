import { useEffect, useCallback, useContext, useState } from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

import Layout from "../../components/ui/Layout";
import api from "../../api/client";
import FeedbackCard from "../../components/restaurant/FeedbackCard";
import { UserContext } from "../../context/UserContext";

const PendingReviews = () => {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState(null);

  const getPendingReviews = useCallback(async () => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await api.get(`/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(data?.reviews);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getPendingReviews();
  }, [getPendingReviews]);

  if (!reviews || !reviews?.length) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center">
          <CheckBadgeIcon className="w-12 h-12" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No pending reviews
          </h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative bg-white px-6 rounded-lg shadow">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          {reviews?.map((review) => (
            <FeedbackCard
              key={review?.id}
              owner={user}
              review={review}
              getRestaurant={getPendingReviews}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default PendingReviews;
