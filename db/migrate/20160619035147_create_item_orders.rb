class CreateItemOrders < ActiveRecord::Migration
  def change
    create_table :item_orders do |t|
      t.integer :quantity
      t.float :unit_value
      t.float :discount
      t.float :total
      t.references :order, index: true
      t.references :product, index: true
      t.timestamps null: false
    end
  end
end
