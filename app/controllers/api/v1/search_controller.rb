module Api
  module V1
    class SearchController < ApplicationController
      respond_to :json

      def user
        @users = UserSearch.new(q: params[:query]).results.limit(4)
        respond_with(:api, :v1, @users, meta: {count: @users.count})
      end

      def restaurant
        @restaurants = RestaurantSearch.new(q: params[:query]).results.limit(4)
        respond_with(:api, :v1, @restaurants, meta: {count: @restaurants.count})
      end

      def customer
        @users = CustomerSearch.new(q: params[:query]).results.limit(4)
        respond_with(:api, :v1, @users)
      end

      def product
        @products = ProductSearch.new(q: params[:query]).results.limit(4)
        respond_with(:api, :v1, @products)
      end

    end
  end
end
