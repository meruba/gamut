class User < ActiveRecord::Base
  module Roles
    extend ActiveSupport::Concern

    # roles that will be used by the users
    ROLES = %w(admin restaurant customer)

    included do
      validates :role, presence: true,
                       inclusion: {in: ROLES}
    end

    # Define method names based on existing roles.
    #
    # @!method role?
    # @return [Boolean]
    ROLES.each do |role|
      define_method "#{role}?" do
        self.role == role
      end
    end

    module ClassMethods
      def roles
        ROLES
      end
    end
  end
end
