class RemoveProduct < ActiveRecord::Migration
  def change
    add_column :products, :removed, :boolean, default: false
  end
end
