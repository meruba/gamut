class AddStatusProduct < ActiveRecord::Migration
  def change
    add_column :products, :public, :boolean, default: true
  end
end
