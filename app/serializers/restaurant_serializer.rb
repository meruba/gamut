class RestaurantSerializer < ActiveModel::Serializer
  root false
  attributes  :id,
              :logo,
              :telephone,
              :address,
              :email,
              :delivery_time,
              :open_time,
              :close_time
end
