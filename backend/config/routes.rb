Rails.application.routes.draw do

  resources :users do
    member do
      get :todos
    end
    collection do
      post :login
    end
  end

  resources :folders

  resources :todos, only: [:create, :update] do
    member do
      put :checkMarks
    end

  end
end
