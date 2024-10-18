class Review < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant

  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :visit_date, presence: true
  validates :comment, presence: true, length: { minimum: 10 }
end
