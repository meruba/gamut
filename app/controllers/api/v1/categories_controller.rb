module Api
  module V1
    class CategoriesController < ApplicationController

      before_action :authenticate_user!

      respond_to :json

      def index
        respond_with(Category.all)
      end

      def show
        respond_with(Category.find(params[:id]))
      end

      def create
        @category = Category.create(category_params)
        respond_with(:api, :v1, @category)
      end

      def update
        @category.update(category_params)
        respond_with(:api, :v1, @category)
      end

      private

      def category_params
        params.require(:category).permit(:id, :name, :restaurant_id)
      end

    end
  end
end
