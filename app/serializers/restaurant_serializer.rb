class RestaurantSerializer < ActiveModel::Serializer
  root false
  attributes  :id,
              :name,
              :owner,
              :logo,
              :telephone,
              :address,
              :email,
              :delivery_time,
              :open_time,
              :close_time,
              :user_id,
              :user_active,
              :products,

  def logo
    object.logo.url
  end

  def owner
    object.user.name
  end

  def user_active
    object.user.is_active
  end

end
