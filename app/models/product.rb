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
#  removed       :boolean          default("false")
#

class Product < ActiveRecord::Base

  begin :relationships
    belongs_to :restaurant #disabled temporally from frontend
    belongs_to :category #disabled temporally from frontend
  end

  begin :validations
    validates :name, :price, presence: true, allow_blank: false
  end
end
