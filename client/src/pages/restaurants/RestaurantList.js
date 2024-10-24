import { useEffect, useState } from "react";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import ReactStars from "react-rating-stars-component";

import Layout from "../../components/ui/Layout";
import RestaurantCard from "../../components/restaurant/Card";
import Checkbox from "../../components/ui/Checkbox";
import Label from "../../components/ui/Label";
import api from "../../api/client";

const RestaurantList = () => {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const getRestaurantList = async () => {
      try {
        const token = localStorage.getItem("jwt");

        let qs;
        if (rating) {
          qs = `rating=${rating}`;
        } else {
          qs = "";
        }

        const { data } = await api.get(`/restaurants?${qs}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setList(data);
      } catch (error) {
        console.error(error);
      }
    };

    getRestaurantList();
  }, [rating]);

  const toggleFilter = (e) => {
    const checked = e.target.checked;
    setFilter(checked);
    !checked && setRating(0);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-6 max-w-2xl w-full mx-auto">
        <div className="flex items-center justify-between h-10 w-full">
          <div className="flex items-center gap-2">
            <Checkbox
              id="rating"
              name="rating"
              checked={filter}
              onChange={toggleFilter}
            />
            <Label htmlFor="rating">Filter by</Label>
          </div>
          {filter && (
            <ReactStars
              size={30}
              count={5}
              value={rating}
              onChange={setRating}
            />
          )}
        </div>
        {list.length > 0 ? (
          list.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-10">
            <BuildingStorefrontIcon className="w-12 h-12" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              No restaurants found
            </h3>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RestaurantList;
