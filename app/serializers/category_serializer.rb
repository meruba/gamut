class CategorySerializer < ActiveModel::Serializer
  root false
  attributes :id,
            :name
end
