import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../components/ui/Layout";
import StarIcon from "../../assets/icons/Star";
import FeedbackModal from "../../components/modal/FeedbackModal";
import api from "../../api/client";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getRestaurantList = async () => {
      try {
        const token = localStorage.getItem("jwt");

        const { data } = await api.get(`/restaurants/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRestaurant(data?.restaurant);
      } catch (error) {
        console.error(error);
      }
    };

    getRestaurantList();
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <section className="relative bg-white p-6 rounded-lg shadow">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <div className="w-full">
            <h2 className="font-bold text-3xl text-black mb-8 text-center">
              {restaurant?.name} reviews
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-11 pb-11 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
              <div className="box flex flex-col gap-y-4 w-full ">
                <div className="flex items-center w-full">
                  <p className="font-medium text-lg text-black mr-0.5">5</p>
                  <StarIcon className={"h-5 w-5"} />
                  <p className="h-2 w-full sm:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                    <span className="h-full w-[30%] rounded-3xl bg-amber-400 flex"></span>
                  </p>
                  <p className="font-medium text-lg  text-black mr-0.5">989</p>
                </div>
                <div className="flex items-center w-full">
                  <p className="font-medium text-lg text-black mr-0.5">4</p>
                  <StarIcon className={"h-5 w-5"} />
                  <p className="h-2 w-full xl:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                    <span className="h-full w-[40%] rounded-3xl bg-amber-400 flex"></span>
                  </p>
                  <p className="font-medium text-lg text-black mr-0.5">4.5K</p>
                </div>
                <div className="flex items-center">
                  <p className="font-medium text-lg text-black mr-0.5">3</p>
                  <StarIcon className={"h-5 w-5"} />
                  <p className="h-2 w-full xl:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                    <span className="h-full w-[20%] rounded-3xl bg-amber-400 flex"></span>
                  </p>
                  <p className="font-medium text-lg text-black mr-0.5">50</p>
                </div>
                <div className="flex items-center">
                  <p className="font-medium text-lg text-black mr-0.5">2</p>
                  <StarIcon className={"h-5 w-5"} />
                  <p className="h-2 w-full xl:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                    <span className="h-full w-[16%] rounded-3xl bg-amber-400 flex"></span>
                  </p>
                  <p className="font-medium text-lg text-black mr-0.5">16</p>
                </div>
                <div className="flex items-center">
                  <p className="font-medium text-lg text-black mr-0.5">1</p>
                  <StarIcon className={"h-5 w-5"} />
                  <p className="h-2 w-full xl:min-w-[278px] rounded-3xl bg-amber-50 ml-5 mr-3">
                    <span className="h-full w-[8%] rounded-3xl bg-amber-400 flex"></span>
                  </p>
                  <p className="font-medium text-lg py-[1px] text-black mr-0.5">
                    8
                  </p>
                </div>
              </div>
              <div className="p-8 bg-amber-50 rounded-3xl flex items-center justify-center flex-col">
                <h2 className="font-bold text-5xl text-amber-400 mb-6">4.3</h2>
                <div className="flex items-center justify-center gap-2 sm:gap-6 mb-4">
                  <StarIcon className={"h-12 w-12"} />
                  <StarIcon className={"h-12 w-12"} />
                  <StarIcon className={"h-12 w-12"} />
                  <StarIcon className={"h-12 w-12"} />
                  <StarIcon className={"h-12 w-12"} />
                </div>
                <p className="font-medium text-xl leading-8 text-gray-900 text-center">
                  46 Ratings
                </p>
              </div>
            </div>

            <div className="pt-11 pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <StarIcon className={"h-7 w-7"} />
                <StarIcon className={"h-7 w-7"} />
                <StarIcon className={"h-7 w-7"} />
                <StarIcon className={"h-7 w-7"} />
                <StarIcon className={"h-7 w-7"} />
              </div>
              <h3 className="font-semibold text-xl sm:text-2xl leading-9 text-black mb-6">
                Outstanding Experience!!!
              </h3>
              <div className="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
                <h6 className="font-semibold text-lg leading-8 text-indigo-600 ">
                  John Watson
                </h6>
                <p className="font-normal text-lg leading-8 text-gray-400">
                  Nov 01, 2023
                </p>
              </div>
              <p className="font-normal text-lg leading-8 text-gray-400 max-xl:text-justify">
                One of the standout features of Pagedone is its intuitive and
                user-friendly interface. Navigating through the system feels
                natural, and the layout makes it easy to locate and utilize
                various design elements. This is particularly beneficial for
                designers looking to streamline their workflow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Restaurant;
