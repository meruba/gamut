# == Schema Information
#
# Table name: item_orders
#
#  id         :integer          not null, primary key
#  quantity   :integer
#  unit_value :float
#  discount   :float
#  total      :float
#  order_id   :integer
#  product_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ItemOrder < ActiveRecord::Base

  begin :relationships
    belongs_to :factura
    belongs_to :product
  end

end
