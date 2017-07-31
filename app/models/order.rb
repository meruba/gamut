# == Schema Information
#
# Table name: orders
#
#  id             :integer          not null, primary key
#  total          :float            not null
#  price_delivery :float            not null
#  user_id        :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  restaurant_id  :integer
#  address_id     :integer
#

class Order < ActiveRecord::Base

  begin :relationships
    belongs_to :user
    belongs_to :restaurant
    belongs_to :address
    has_many :item_orders
  end

  #nested
  accepts_nested_attributes_for :item_orders

end
