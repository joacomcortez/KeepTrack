Rails.application.routes.draw do

  resources :users do
    collection do
      post :login
      get :getTodos
    end
  end

  resources :folders

  resources :todos



end
