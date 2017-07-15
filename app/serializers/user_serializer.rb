class UserSerializer < ActiveModel::Serializer
  root false
  attributes :id,
             :email,
             :name,
             :username,
             :identification,
             :telephone,
             :movil,
             :role,
             :uid,
             :provider,
             :restaurant_id,
             :image,
             :is_active,
             :addresses

  def image
    object.image.url
  end

  def restaurant_id
    object.restaurant ? object.restaurant.id : ""
  end
end
