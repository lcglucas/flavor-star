class Api::V1::UsersController < ApplicationController
  def index
    users = User.all

    render json: users
  end

  def create
    user = User.new(user_params)
    if user.save
      puts user
      token = encode_token(user_id: user.id)
      render json: { jwt: token, user: user }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:full_name, :email, :password)
  end
end
