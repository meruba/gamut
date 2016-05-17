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
              :products

end
