class Api::V1::SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = encode_token(user_id: user.id)
      render json: { jwt: token, user: user }, status: :created
    else
      render json: { errors: [ "Invalid email or password" ] }, status: :unauthorized
    end
  end
end
