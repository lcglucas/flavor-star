class Api::V1::ReviewsController < ApplicationController
  def create
    review = Review.new(review_params)
    review.user = current_user
    if review.save
      render json: { success: "Your review was added successfully!" }, status: :ok
    else
      render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def review_params
    params.require(:review).permit(:rating, :visit_date, :title, :comment, :restaurant_id)
  end
end
