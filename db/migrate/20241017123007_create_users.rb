class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users, id: :uuid do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :role, null: false, default: 'regular'
      t.timestamps
    end

    # Índice para garantir unicidade do email
    add_index :users, :email, unique: true
  end
end
