class User < ApplicationRecord
  enum :role, { regular: "regular", owner: "owner", admin: "admin" }

  # Bcrypt
  has_secure_password
end
