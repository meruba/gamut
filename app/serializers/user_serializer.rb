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
             :image

  def image
    object.image.url
  end
end
