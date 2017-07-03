class OrderSerializer < ActiveModel::Serializer
  root false
  attributes  :id,
              :total,
              :price_delivery,
              :address,
              :user_id,
              :restaurant_id,
              :user_name,
              :item_orders

  def user_name
    object.user ? object.user.name : ''
  end

end
