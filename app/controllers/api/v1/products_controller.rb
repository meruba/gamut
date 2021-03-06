module Api
  module V1
    class ProductsController < ApplicationController

      before_action :authenticate_user!
      before_action :find_product, only: [:update, :remove, :public]
      authorize_resource
      respond_to :json

      def index
        respond_with(Product.all)
      end

      def show
        respond_with(Product.find(params[:id]))
      end

      def create
        product = Product.create(product_params)
        respond_with(:api, :v1, product)
      end

      def update
        @product.update(product_params)
        respond_with(:api, :v1, @product)
      end

      def remove
        @product.removed = !@product.removed
        @product.save
        respond_with(:api, :v1, @product)
      end

      def public
        @product.public = !@product.public
        @product.save
        respond_with(:api, :v1, @product)
      end

      private

      def product_params
        params.require(:product).permit(:id,
                                        :name,
                                        :description,
                                        :price,
                                        :category_id,
                                        :restaurant_id,
                                        :removed,
                                        :public)
      end

      def find_product
        @product = Product.find(params[:id])
      end

    end
  end
end
