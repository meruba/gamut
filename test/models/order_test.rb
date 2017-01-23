# == Schema Information
#
# Table name: orders
#
#  id             :integer          not null, primary key
#  total          :float            not null
#  price_delivery :float            not null
#  address        :string           not null
#  user_id        :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  restaurant_id  :integer
#

require 'test_helper'

class OrderTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
