class AddUserAccountToRestaurant < ActiveRecord::Migration
  def change
    add_reference :restaurants, :user, index: true
    add_column :restaurants, :owner, :string
  end
end
