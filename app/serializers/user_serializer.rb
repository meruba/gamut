class UserSerializer < ActiveModel::Serializer
  root false
  attributes :id,
             :email,
             :name,
             :username,
             :identification,
             :address,
             :telephone,
             :role,
             :uid,
             :provider,
             :restaurant_id,
             :image

  def image
    object.image.url
  end

  def restaurant_id
    object.restaurant ? object.restaurant.id : ""
  end
end
