class AddTitleToReview < ActiveRecord::Migration[7.2]
  def change
    add_column :reviews, :title, :string, null: false
  end
end
