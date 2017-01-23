class OrderSerializer < ActiveModel::Serializer
  root false
  attributes  :id,
              :total,
              :price_delivery,
              :address,
              :user_id,
              :restaurant_id,
              :user_name

  def user_name
    object.user.name
  end

end
