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
#  user_id       :integer
#  owner         :string
#

class Restaurant < ActiveRecord::Base
  begin :validations
    validates :owner, :name, :email, :address, :telephone,  presence: true,
                                                    uniqueness: true,
                                                    allow_blank: false
  end

  begin :relationships
    belongs_to :user, dependent: :destroy
    has_many :products
  end

  begin :callbacks
    after_create :create_account
  end


  private

  def create_account
    user = User.new(name: self.owner,
                    email: self.email,
                    password: '12345678',
                    role: 'restaurant')
    user.restaurant = self
    user.save

  end

end
