class Api::V1::ReviewsController < ApplicationController
  before_action :check_role, only: [ :create ]
  before_action :check_owner, only: [ :update ]
  before_action :check_admin, only: [ :destroy, :destroy_reply, :update_reply, :update_review ]
  before_action :set_review, only: [ :update, :destroy, :destroy_reply, :update_reply, :update_review ]

  def create
    review = Review.new(review_params)
    review.user = current_user
    if review.save
      render json: { success: "Your review was added successfully!" }, status: :ok
    else
      render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @review.update(reply_params)
      render json: { success: "Your reply was added successfully!" }, status: :ok
    else
      render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @review.destroy
      render json: { success: "This review was deleted successfully!" }, status: :ok
    else
      render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy_reply
    if @review.update(reply: "")
      render json: { success: "This repply was deleted successfully!" }, status: :ok
    else
      render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update_reply
    if @review.update(reply_params)
      render json: { success: "Reply was updated successfully!" }, status: :ok
    else
      render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update_review
    if @review.update(review_params)
      render json: { success: "Review was updated successfully!" }, status: :ok
    else
      render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def check_role
    if current_user.owner?
      render json: { errors: [ "Only regular users are allowed to review a restaurant" ] }, status: :forbidden
    end
  end


  def review_params
    params.require(:review).permit(:rating, :visit_date, :title, :comment, :restaurant_id)
  end

  def check_owner
    restaurant = Restaurant.find(params[:id])
    if restaurant.owner != current_user
      render json: { errors: [ "Only the owner is allowed to reply this review" ] }, status: :forbidden
    end
  end

  def reply_params
    params.require(:review).permit(:reply)
  end

  def set_review
    @review = Review.find(params[:id_review])
  end
end
