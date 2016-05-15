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
      can [:show, :update], Restaurant
      cannot [:create, :destroy], Restaurant
    when "customer"
      can [:show, :update, :upload_image], User
      cannot [:create, :destroy], User
    end
  end
end
