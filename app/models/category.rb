# == Schema Information
#
# Table name: categories
#
#  id            :integer          not null, primary key
#  name          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  restaurant_id :integer
#

class Category < ActiveRecord::Base
  begin :relationships
    belongs_to :restaurant
  end
end
