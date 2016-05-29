# == Schema Information
#
# Table name: products
#
#  id            :integer          not null, primary key
#  name          :string           not null
#  price         :float            not null
#  description   :string
#  category_id   :integer
#  restaurant_id :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  public        :boolean          default("true")
#

require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
