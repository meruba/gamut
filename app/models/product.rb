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
#

class Product < ActiveRecord::Base

  begin :relationships
    belongs_to :restaurant, dependent: :destroy
    belongs_to :category
  end
end
