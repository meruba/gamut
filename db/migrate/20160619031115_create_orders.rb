class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.float :total, null: false
      t.float :price_delivery, null: false
      t.string :address, null: false
      t.references :user, index: true
      t.timestamps null: false
    end
  end
end
