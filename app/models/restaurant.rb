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
    validates :name, :address, :telephone,  presence: true,
                                            allow_blank: false
    validates :name, uniqueness: true
  end

  mount_uploader :logo, ImageUploader

  begin :relationships
    belongs_to :user
    has_many :products, dependent: :destroy
    has_many :categories, dependent: :destroy
  end

  begin :callbacks
    # after_create :create_account
  end


  private

  def create_account
    user = User.new(name: self.name,
                    email: self.email,
                    password: '12345678',
                    role: 'restaurant')
    user.restaurant = self
    user.save

  end

end
