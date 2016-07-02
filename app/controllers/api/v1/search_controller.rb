module Api
  module V1
    class SearchController < ApplicationController
      respond_to :json

      def user
        @users = UserSearch.new(q: params[:query]).results
        respond_with(:api, :v1, @users, meta: {count: @users.count})
      end
    end
  end
end
