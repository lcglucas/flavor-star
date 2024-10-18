class CreateReviews < ActiveRecord::Migration[7.2]
  def change
    create_table :reviews, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, index: true, type: :uuid
      t.references :restaurant, null: false, foreign_key: true, index: true, type: :uuid
      t.integer :rating, null: false, limit: 1
      t.date :visit_date, null: false
      t.text :comment, null: false
      t.timestamps
    end
  end
end
