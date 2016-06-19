class AddHasAccountToUser < ActiveRecord::Migration
  def change
    add_column :users, :has_account, :boolean, default: true
  end
end
