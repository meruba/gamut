class OrderSerializer < ActiveModel::Serializer
  root false
  attributes  :id,
              :total,
              :price_delivery,
              :address,
              :user_id,
              :restaurant_id,
              :user_name,
              :canceled,
              :reason_canceled,
              :created_at

  has_many :item_orders

  def user_name
    object.user ? object.user.name : ''
  end

  def created_at
    object.created_at.strftime("%Y-%m-%d")
  end

  def address
    object.address
  end

  def item_orders
    object.item_orders.map do |item|
      {
        id: item.id,
        quantity: item.quantity,
        unit_value: item.unit_value,
        discount: item.discount,
        total: item.total,
        product: item.product.name
      }
    end
  end

end
