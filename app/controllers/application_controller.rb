class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  before_action :configure_permitted_params, if: :devise_controller?

  # cancan
  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path,
                status: :forbidden,
                error: "You need permission"
  end

  def angular
    render 'layouts/application'
  end

  private

  def configure_permitted_params
    added_attrs = [:username, :email, :name, :has_account]
    edit_attrs = [:username, :email, :name, :identification, :address, :telephone]
    devise_parameter_sanitizer.for(:sign_up) << added_attrs
    devise_parameter_sanitizer.for(:sign_in) << added_attrs
    devise_parameter_sanitizer.for(:account_update) << edit_attrs
  end
end
