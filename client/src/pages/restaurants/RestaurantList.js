import { useEffect, useState } from "react";

import Layout from "../../components/ui/Layout";
import RestaurantCard from "../../components/restaurant/Card";
import api from "../../api/client";

const RestaurantList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getRestaurantList = async () => {
      try {
        const token = localStorage.getItem("jwt");

        const { data } = await api.get("/restaurants", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setList(data);
      } catch (error) {
        console.error(error);
      }
    };

    getRestaurantList();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center items-start">
        {list.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </Layout>
  );
};

export default RestaurantList;
