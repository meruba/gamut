class Ability
  include CanCan::Ability

  def initialize(user)
    # See the wiki for details:
    # https://github.com/ryanb/cancan/wiki/Defining-Abilities
    case user.role
    when "admin"
      can :manage, :all
    when "restaurant"
      can [:show, :update, :index], User
      cannot [:create, :destroy], User
    when "customer"
      can [:show, :update], User
      cannot [:create, :destroy], User
    end
  end
end
