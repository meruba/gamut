class OrderSerializer < ActiveModel::Serializer
  root false
  attributes  :id,
              :total,
              :price_delivery,
              :address,
              :user_id,
              :restaurant_id,
              :user_name,
              :item_orders,
              :created_at

  def user_name
    object.user ? object.user.name : ''
  end

  def created_at
    object.created_at.strftime("%Y-%m-%d")
  end

  def address
    object.address
  end

end
