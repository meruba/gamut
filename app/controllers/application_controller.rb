class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  before_action :configure_permitted_params, if: :devise_controller?

  def angular
    render 'layouts/application'
  end

  private

  def configure_permitted_params
    devise_parameter_sanitizer.for(:sign_up) << :username
  end
end
