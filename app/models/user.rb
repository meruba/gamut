# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  provider               :string           default("email"), not null
#  uid                    :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default("0"), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#  name                   :string
#  nickname               :string
#  image                  :string
#  email                  :string
#  tokens                 :json
#  created_at             :datetime
#  updated_at             :datetime
#  username               :string
#  identification         :string
#  telephone              :string
#  role                   :string           default("customer"), not null
#  has_account            :boolean          default("true")
#  is_active              :boolean          default("true")
#  movil                  :string
#  code                   :string
#

class User < ActiveRecord::Base

  # Include default devise modules. :confirmable
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable

  include DeviseTokenAuth::Concerns::User
  include Roles
  mount_uploader :image, ImageUploader


  begin :validations
    validates :name,  :email, presence: true,
                              uniqueness: true,
                              allow_blank: false
  end

  begin :relationships
    has_one :restaurant, dependent: :destroy
    has_many :orders, dependent: :destroy
    has_many :addresses, dependent: :destroy
  end

  #nested
  accepts_nested_attributes_for :addresses

  def active_for_authentication?
    super and self.is_active?
  end

  #overrides
  def password_required?
    if new_record?
      self.has_account ? true:false
    end
  end
end
