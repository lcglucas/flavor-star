class Api::V1::RestaurantsController < ApplicationController
  def index
    puts "################"
    restaurants = Restaurant.includes(:user).all

    # restaurants.map! { |restaurant| {restaurant: restaurant, owner: restaurant.user} }
    render json: restaurants.as_json(include: { owner: { only: [ :id, :full_name, :email ] } })
  end
end
