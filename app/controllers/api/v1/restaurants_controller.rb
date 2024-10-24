class Api::V1::RestaurantsController < ApplicationController
  before_action :check_role, only: [ :create ]
  before_action :check_admin, only: [ :update, :destroy ]
  before_action :set_restaurant, only: [ :update, :destroy ]

  def index
    rating = params[:rating]

    restaurants = Restaurant.left_joins(:reviews)
                            .group("restaurants.id")
                            .select("restaurants.*, COALESCE(AVG(reviews.rating), 0) AS average_rating")
                            .order("average_rating DESC")

    restaurants = restaurants.having("COALESCE(AVG(reviews.rating), 0) = ?", rating.to_f) if rating

    restaurants = restaurants.where(user: current_user) if current_user&.owner?

    render json: restaurants.as_json(
      include: { owner: { only: [ :id, :full_name, :email ] } },
      methods: [ :average, :reviews_count ]
    )
  end


  def create
    restaurant = Restaurant.new(restaurant_params)
    restaurant.user = current_user
    if restaurant.save
      render json: { restaurant: restaurant }, status: :created
    else
      render json: { errors: restaurant.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    restaurant = Restaurant.find(params[:id])
    if restaurant
      render json: restaurant.as_json(
        include: {
          owner: { only: [  :id, :full_name, :email ] },
          reviews: { only: [ :id, :rating, :title, :comment, :visit_date, :reply, :restaurant_id ], include: { user: { only: [ :full_name ] } } }
        },
        methods: [ :average ]
      ), status: :ok
    else
      render json: { errors: "Restaurant not found" }, status: :not_found
    end
  end

  def update
    if @restaurant.update(restaurant_params)
      render json: { success: "Restaurant was updated successfully!" }, status: :ok
    else
      render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @restaurant.destroy
      render json: { success: "Restaurant was deleted successfully!" }, status: :ok
    else
      render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :description)
  end

  def check_role
    unless current_user&.owner?
      render json: { errors: [ "You are not authorized to perform this action" ] }, status: :forbidden
    end
  end

  def set_restaurant
    @restaurant = Restaurant.find(params[:id])
  end
end
