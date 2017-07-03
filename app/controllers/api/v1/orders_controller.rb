module Api
  module V1
    class OrdersController < ApplicationController

      before_action :authenticate_user!
      before_action :find_order, only: [:update, :remove, :public]


      # save json nested attributes
      # http://stackoverflow.com/questions/19574595/rails-4-not-updating-nested-attributes-via-json#comment34449874_19574595
      nested_attributes_names = Order.nested_attributes_options.keys.map do |key|
        key.to_s.concat('_attributes').to_sym
      end

      wrap_parameters include: Order.attribute_names + nested_attributes_names,
      format: :json

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
                                      :total,
                                      :price_delivery,
                                      :address,
                                      :user_id,
                                      :restaurant_id,
                                      :item_orders_attributes => [
                                        :quantity,
                                        :discount,
                                        :product_id,
                                        :unit_value,
                                        :total,
                                        :order_id
                                      ])
      end

      def find_order
        @product = Order.find(params[:id])
      end

    end
  end
end
