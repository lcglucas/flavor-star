class Restaurant < ApplicationRecord
  belongs_to :user
  validates :name, presence: true, length: { minimum: 5, maximum: 50 }
  validates :description, presence: true, length: { minimum: 10, maximum: 150 }

  def owner
    user
  end
end
