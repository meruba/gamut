module Api
  module V1
    class OrdersController < ApplicationController

      before_action :authenticate_user!
      before_action :find_order, only: [:update, :remove, :public]

      # authorize_resource
      respond_to :json

      def index
        respond_with(Order.all)
      end

      def show
        respond_with(Order.find(params[:id]))
      end

      def create
        order = Order.create(order_params)
        respond_with(:api, :v1, order)
      end

      def update
        @order.update(order_params)
        respond_with(:api, :v1, @order)
      end


      private

      def order_params
        params.require(:order).permit(:id,
                                        :name,
                                        :description,
                                        :price,
                                        :category_id,
                                        :restaurant_id,
                                        :removed,
                                        :public)
      end

      def find_order
        @product = Order.find(params[:id])
      end

    end
  end
end
