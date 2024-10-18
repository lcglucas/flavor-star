class Api::V1::RestaurantsController < ApplicationController
  before_action :check_role, only: [ :create ]

  def index
    restaurants = Restaurant.includes(:user).all

    # restaurants.map! { |restaurant| {restaurant: restaurant, owner: restaurant.user} }
    render json: restaurants.as_json(include: { owner: { only: [ :id, :full_name, :email ] } })
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
