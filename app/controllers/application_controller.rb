require "jwt"

class ApplicationController < ActionController::API
  before_action :authorized

  def authorized
    render json: { errors: [ "Please signin or create an account first" ] }, status: :unauthorized unless logged_in?
  end

  def logged_in?
    !!current_user
  end

  def current_user
    if decoded_token
      user_id = decoded_token[0]["user_id"]
      User.find_by(id: user_id)
    end
  end

  def auth_header
    request.headers["Authorization"]
  end

  def encode_token(payload)
    JWT.encode(payload, nil, "none")
  end

  def decoded_token
    if auth_header
      token = auth_header.split(" ")[1]
      begin
        JWT.decode(token, nil, false)
      rescue JWT::DecodeError
        nil
      end
    end
  end
end
