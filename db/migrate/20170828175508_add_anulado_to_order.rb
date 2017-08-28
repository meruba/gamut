class AddAnuladoToOrder < ActiveRecord::Migration
  def change
    add_column :orders, :canceled, :boolean, default: false
    add_column :orders, :reason_canceled, :string
  end
end
