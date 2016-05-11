class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.string :name, null:false
      t.string :logo
      t.string :telephone, null:false
      t.string :address, null:false
      t.string :email, null:false
      t.string :delivery_time
      t.datetime :open_time
      t.datetime :close_time
      t.timestamps null: false
    end
  end
end
