module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user!
      authorize_resource

      respond_to :json

      def index
        respond_with(User.all.order("id DESC"))
      end

      def restaurant
        respond_with(User.find(params[:user_id]).restaurant)
      end

      def show
        respond_with(User.find(params[:id]))
      end

      def create
        @user = User.create(user_params)
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

      private

      def user_params
        params.require(:user).permit(:name,
                                      :email,
                                      :username,
                                      :image,
                                      :role
                                    )
      end

    end
  end
end
