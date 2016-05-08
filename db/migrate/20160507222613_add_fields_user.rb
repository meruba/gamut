class AddFieldsUser < ActiveRecord::Migration
  def change
    add_column :users, :identification, :string, unique: true
    add_column :users, :address, :string
    add_column :users, :telephone, :string
  end
end
