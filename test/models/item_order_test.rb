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

require 'test_helper'

class ItemOrderTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
