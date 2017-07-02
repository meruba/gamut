module Api
  module V1
    class SearchController < ApplicationController
      respond_to :json

      def user
        @users = UserSearch.new(q: params[:query]).results.limit(4)
        respond_with(:api, :v1, @users, meta: {count: @users.count})
      end

      def restaurant
        @restaurant = RestaurantSearch.new(q: params[:query]).results
        respond_with(:api, :v1, @restaurant, meta: {count: @restaurant.count})
      end

      def customer
        @users = CustomerSearch.new(q: params[:query]).results.limit(4)
        respond_with(:api, :v1, @users)
      end

    end
  end
end
