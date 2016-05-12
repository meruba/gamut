module Api
  module V1
    class UsersController < ApplicationController

      before_action :authenticate_user!

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

      def update
        @user.update(user_params)
        respond_with(:api, :v1, @user)
      end

      private

      def user_params
        params.require(:user).permit(:name,
                                      :email,
                                      :username
                                    )
      end

    end
  end
end
