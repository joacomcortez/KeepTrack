class UsersController < ApplicationController  
  def index
    @users = User.all
    render json: @users
  end

def edit
    @user = User.find(params[:id])
    if @user.update(user_params)
      render status: 200, json: { user: @user }
    else
      render status: 400, json: { message: @user.error.details }
    end
end

  def create
    @user = User.new(user_params)
    if @user.save
      render status: 200, json: { user: @user }
    else
      render status: 400, json: { message: @user.errors.details }
    end
  end

  def show
    @user = User.find_by(params[:id])
    if @user.exists?
      render status: 200, json: { user: @user }
    else
      render status: 400, json: { message: 'user not found' }
    end
  end

  def login
    @user = User.find_by(user_params)

    user_json = @user.as_json

    if @user.present?
      render status: 200, json: { user: user_json }
    else
      render status: 400, json: { message: 'user not found' }
    end
  end
  
  def todos
    @user = User.find(params[:id])
    if @user.blank?
      return render status: 400, json: {message: 'User not found'}
    end

    folders = @user.folders
    if folders.present?
      render status: 200, json: folders.as_json(include: [:todos])
    else
      render status: 400, json: { message: 'Error fetching folders' }
    end
  end
private
def user_params
    params.require(:user).permit(:username, :password) 
end
end
