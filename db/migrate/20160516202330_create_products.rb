class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.float :price, null: false
      t.string :description
      t.references :category, index: true
      t.references :restaurant, index: true
      t.timestamps null: false
    end
  end
end
