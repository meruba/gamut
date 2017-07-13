# == Schema Information
#
# Table name: addresses
#
#  id               :integer          not null, primary key
#  neighborhood     :string
#  main_street      :string
#  secondary_street :string
#  number_place     :string
#  reference_place  :string
#  user_id          :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Address < ActiveRecord::Base
end
