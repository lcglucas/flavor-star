class Api::V1::RestaurantsController < ApplicationController
  before_action :check_role, only: [ :create ]

  def index
    if current_user&.owner?
      restaurants = Restaurant.where(user: current_user).includes(:user)
    else
      restaurants = Restaurant.left_joins(:reviews)
                              .group("restaurants.id")
                              .select("restaurants.*, COALESCE(AVG(reviews.rating), 0) AS average_rating")
                              .order("average_rating DESC")
    end

    render json: restaurants.as_json(include: { owner: { only: [ :id, :full_name, :email ] } }, methods: [ :average, :reviews_count ])
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
          reviews: { only: [ :id, :rating, :title, :comment, :visit_date, :reply ], include: { user: { only: [ :full_name ] } } }
        },
        methods: [ :average ]
      ), status: :ok
    else
      render json: { errors: "Restaurant not found" }, status: :not_found
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
end
