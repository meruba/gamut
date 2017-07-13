class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.string :neighborhood
      t.string :main_street
      t.string :secondary_street
      t.string :number_place
      t.string :reference_place
      t.references :user, index: true
      t.timestamps null: false
    end
  end
end
