module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user!
      authorize_resource

      # save json nested attributes
      # http://stackoverflow.com/questions/19574595/rails-4-not-updating-nested-attributes-via-json#comment34449874_19574595
      nested_attributes_names = Address.nested_attributes_options.keys.map do |key|
        key.to_s.concat('_attributes').to_sym
      end

      wrap_parameters include: Address.attribute_names + nested_attributes_names

      respond_to :json

      def index
        respond_with(User.all.order("id DESC"))
      end

      def show
        respond_with(User.find(params[:id]))
      end

      def create
        @user = User.create(user_params)
        respond_with(:api, :v1, @user)
      end

      def new_customer
        @user = User.create(user_params.merge(role: "customer", has_account: false))
        respond_with(:api, :v1, @user)
      end

      def update_customer
        @user = User.find(params[:id])
        @user.update(user_params)
        respond_with(:api, :v1, @user)
      end

      def update
        @user.update(user_params)
        respond_with(:api, :v1, @user)
      end

      def upload_image
        @user = User.find(params[:user_id])
        @user.image = params[:file]
        @user.save
        respond_with(:api, :v1, @user)
      end

      def active
        @user = User.find(params[:user_id])
        @user.toggle! :is_active
        respond_with(:api, :v1, @user)
      end

      def customers
        respond_with(User.where(role: 'customer').order("id DESC"))
      end

      private

      def user_params
        params.require(:user).permit(:name,
                                      :email,
                                      :username,
                                      :image,
                                      :role,
                                      :is_active,
                                      :identification,
                                      :movil,
                                      :telephone,
                                      :has_account,
                                      :code,
                                      :addresses_attributes => [
                                        :neighborhood,
                                        :main_street,
                                        :secondary_street,
                                        :number_place,
                                        :reference_place,
                                        :name_place,
                                        :user_id
                                      ]
                                    )
      end
    end
  end
end
