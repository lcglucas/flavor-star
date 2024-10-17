class User < ApplicationRecord
  enum :role, { regular: "regular", owner: "owner", admin: "admin" }
  before_save { self.email = email.downcase }
  validates :email, presence: true,
                    uniqueness: { case_sensitive: false },
                    length: { maximum: 105 },
                    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :full_name, presence: true,
                        length: { minimum: 5, maximum: 105 }
  has_many :restaurants

  # Bcrypt
  has_secure_password
end
