class UserSearchSerializer < ActiveModel::Serializer
  root false
  attributes :id,
             :email,
             :name,
             :identification,
             :address,
             :telephone,
             :image

  def image
    object.image.url
  end

end
