class ProductSerializer < ActiveModel::Serializer
  root false
  attributes :category_name, :product

  def product
    object
  end

  def category_name
    object.category ? object.category.name : ''
  end
end
