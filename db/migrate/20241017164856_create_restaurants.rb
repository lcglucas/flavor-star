class CreateRestaurants < ActiveRecord::Migration[7.2]
  def change
    create_table :restaurants, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, index: true, type: :uuid
      t.string :name, null: false
      t.string :description, null: false
      t.timestamps
    end
  end
end
