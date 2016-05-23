module Overrides
  class SessionsController < DeviseTokenAuth::SessionsController
    def render_create_success
      render json: {
        data: UserSerializer.new(@resource)
      }
    end
  end
end
