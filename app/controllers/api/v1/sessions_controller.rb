require "jwt"

class Api::V1::SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])

    puts params

    if user&.authenticate(params[:password])
      token = encode_token(user_id: user.id)
      render json: { jwt: token, user: user }, status: :created
    else
      render json: { errors: [ "Invalid email or password" ] }, status: :unauthorized
    end
  end

  private

  # Criação do token JWT
  def encode_token(payload)
    JWT.encode(payload, nil, "none")
  end
end