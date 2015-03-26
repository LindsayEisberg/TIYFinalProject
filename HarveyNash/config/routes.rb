Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # API
  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      # hello world
      get 'hello' => 'foo#hello'

      # auth
      post 'auth' => 'auth#authenticate'

      # users
      get 'profile' => 'users#index'
      get 'profile/:id' => 'users#show'
      put 'profile/:id' => 'users#update'
      patch 'profile/:id' => 'users#update'
      post 'register' => 'users#create'

      # sessions
      get 'sessions' => 'sessions#index'
      get 'sessions/active' => 'sessions#active_sessions'
      get 'sessions/open' => 'sessions#open'
      get 'sessions/:id' => 'sessions#show'
      post 'sessions' => 'sessions#create'
      post 'sessions/:id/enter/:user_id' => 'sessions#enter_room'
      post 'sessions/:id/exit/:user_id' => 'sessions#exit_room'
      get 'sessions/:id/center_stage' => 'sessions#center_stage'
      post 'sessions/:id/center_stage/:user_id' => 'sessions#center_stage_add'
      delete 'sessions/:id/center_stage/:user_id' => 'sessions#center_stage_remove'
      get 'sessions/:id/close' => 'sessions#close'
      get 'sessions/:id/credentials' => 'sessions#credentials'
      get 'sessions/:id/token' => 'sessions#token'
      # session -> questions
      get 'sessions/:session_id/questions' => 'questions#index'
      get 'questions/:id' => 'questions#show'
      post 'sessions/:session_id/questions' => 'questions#create'
      put 'questions/:id' => 'questions#update'
      patch 'questions/:id' => 'questions#update'
      delete 'questions/:id' => 'questions#destroy'
    end
  end
end
