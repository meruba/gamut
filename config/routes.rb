Rails.application.routes.draw do
  devise_for :users

  namespace :api, defaults: { format: :json } do

    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
      token_validations:  'overrides/token_validations',
      sessions:  'overrides/sessions'
    }

    namespace :v1 do

      resource :users do
        get "customers"
        post "new_customer"
        put "update_customer"
      end

      resources :users do
        post "upload_image"
        post "active"
      end

      resources :restaurants do
        get "menu"
        post "upload_image"
        get "categories"
      end

      resources :products do
        member do
          post "remove"
          post "public"
        end
      end

      resources :categories
      resources :orders
      resources :search, only: :index
      get "search/user"
      get "search/restaurant"
      get "search/customer"
      get "search/product"

    end
  end

  root 'application#angular'

end
