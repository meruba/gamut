class AddFieldsToUser < ActiveRecord::Migration
  def change
    add_column :users, :movil, :string
    add_column :users, :code, :string, unique: true
    remove_column :users, :address
  end
end
