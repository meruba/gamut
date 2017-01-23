class CategorySerializer < ActiveModel::Serializer
  root false
  attributes  :id,
              :name,
              :restaurant_id
end
