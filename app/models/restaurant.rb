class Restaurant < ApplicationRecord
  belongs_to :user
  validates :name, presence: true, length: { minimum: 5, maximum: 50 }
  validates :description, presence: true, length: { minimum: 10, maximum: 150 }
  has_many :reviews, dependent: :delete_all
  has_many :reviewers, through: :reviews, source: :user

  def owner
    user
  end

  def average
    reviews.where.not(rating: nil).average(:rating).to_i
  end

  def reviews_count
    reviews.count
  end
end
