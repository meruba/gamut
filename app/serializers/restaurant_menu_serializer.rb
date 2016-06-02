class RestaurantMenuSerializer < ActiveModel::Serializer
  root false
  attributes  :id,
              :name,
              :owner,
              :products
              
  def products
    object.products.where(removed: false).group_by{ |p| p.category.name }
  end

end
