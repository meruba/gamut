class UserSerializer < ActiveModel::Serializer
  root false
  attributes :id,
             :email,
             :name,
             :username,
             :identification,
             :address,
             :telephone
end
