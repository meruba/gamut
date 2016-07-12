module Api
  module V1
    class RestaurantsController < ApplicationController
      before_action :authenticate_user!
      authorize_resource

      respond_to :json

      def index
        respond_with(Restaurant.all.order("id DESC"))
      end

      def menu
        @restaurant = Restaurant.find(params[:restaurant_id])
        respond_with(:api, :v1, RestaurantMenuSerializer.new(@restaurant))
      end

      def show
        respond_with(Restaurant.find(params[:id]))
      end

      def create
        @restaurant = Restaurant.create(restaurant_params)
        respond_with(:api, :v1, @restaurant)
      end

      def update
        @restaurant = Restaurant.find(params[:id])
        @restaurant.update(restaurant_params)
        respond_with(:api, :v1, @restaurant)
      end

      def upload_image
        @restaurant = Restaurant.find(params[:restaurant_id])
        @restaurant.logo = params[:file]
        @restaurant.save
        respond_with(:api, :v1, @restaurant)
      end

      private

      def restaurant_params
        params.require(:restaurant).permit(:name,
                                          :owner,
                                          :logo,
                                          :telephone,
                                          :address,
                                          :email,
                                          :delivery_time,
                                          :open_time,
                                          :close_time,
                                          :user_id
                                          )
      end
    end
  end
end
