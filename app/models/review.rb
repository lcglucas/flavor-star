class Review < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant

  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :visit_date, presence: true
  validates :title, presence: true, length: { minimum: 5 }
  validates :comment, presence: true, length: { minimum: 10 }

  validates :user_id, uniqueness: { scope: :restaurant_id }
end
