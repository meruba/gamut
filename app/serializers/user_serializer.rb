class UserSerializer < ActiveModel::Serializer
  root false
  attributes :id,
             :email,
             :name,
             :uid,
             :provider,
             :username
end
