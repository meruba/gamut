# == Schema Information
#
# Table name: restaurants
#
#  id            :integer          not null, primary key
#  name          :string           not null
#  logo          :string
#  telephone     :string           not null
#  address       :string           not null
#  email         :string           not null
#  delivery_time :string
#  open_time     :datetime
#  close_time    :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Restaurant < ActiveRecord::Base
end
