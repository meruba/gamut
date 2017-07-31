class RelationAddressToOrder < ActiveRecord::Migration
  def change
    add_reference :orders, :address, index: true
    remove_column :orders, :address
  end
end
