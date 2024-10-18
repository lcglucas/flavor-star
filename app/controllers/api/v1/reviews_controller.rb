class Api::V1::ReviewsController < ApplicationController
  def create
    review = Review.new(review_params)
    puts "#########"
    puts review
    puts "#########"
    # if user.save
    #   token = encode_token(user_id: user.id)
    #   render json: { jwt: token, user: user }, status: :created
    # else
    #   render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    # end
  end

  private

  def review_params
    params.permit(:rating, :visit_date, :comment)
  end
end
