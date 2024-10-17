require "jwt"

class ApplicationController < ActionController::API
  def encode_token(payload)
    JWT.encode(payload, nil, "none")
  end
end
