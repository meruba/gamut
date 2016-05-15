module Api
  module V1
    class RestaurantsController < ApplicationController

      respond_to :json

      def index
        respond_with(Restaurant.all.order("id DESC"))
      end

      def show
        respond_with(Restaurant.find(params[:id]))
      end

      def create
        @restaurant = Restaurant.create(restaurant_params)
        respond_with(:api, :v1, @restaurant)
      end

      def update
        @restaurant.update(restaurant_params)
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
                                          :close_time
                                          )
      end
    end
  end
end
