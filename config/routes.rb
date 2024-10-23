Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "login", to: "sessions#create"
      delete "logout", to: "sessions#destroy"
      resources :users
      resources :restaurants
      resources :reviews

      patch "restaurants/:id/reviews/:id_review", to: "reviews#update"
      delete "reviews/:id_review/reply", to: "reviews#destroy_reply"
      patch "reviews/:id_review/reply", to: "reviews#update_reply"
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
