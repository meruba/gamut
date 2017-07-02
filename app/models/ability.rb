class Ability
  include CanCan::Ability

  def initialize(user)
    # See the wiki for details:
    # https://github.com/ryanb/cancan/wiki/Defining-Abilities
    case user.role
    when "admin"
      can :manage, :all
    when "restaurant"
      can [:show, :update, :index, :upload_image], User
      cannot [:create, :destroy], User
      can [:show, :update, :menu, :categories, :upload_image], Restaurant
      cannot [:create, :destroy], Restaurant
      can [:create, :show, :update, :remove, :public], Product
    when "customer"
      can [:show, :update, :upload_image], User
      cannot [:create, :destroy], User
    when "asistent"
      can [:show, :new_customer, :customers, :update, :upload_image], User
      cannot [:destroy, :index], User
      can [:create, :show, :update, :remove, :index], Product
    end
  end
end
