class Restaurant < ApplicationRecord
  belongs_to :user
  validates :name, presence: true, length: { minimum: 5, maximum: 50 }
  validates :description, presence: true, length: { minimum: 10, maximum: 150 }
  has_many :reviews
  has_many :reviewers, through: :reviews, source: :user

  def owner
    user
  end
end
