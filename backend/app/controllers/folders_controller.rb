class FoldersController < ApplicationController

    def index
        @folders = Folder.all
        render json: @folders
    end

    def create
        @folder = Folder.new(title: params[:title])
        @user = User.find_by(id: params[:userId])
        @folder.user = @user
        if @folder.save
            render status: 200, json: @folder.as_json(include: [:todos])
        else
            render status: 400, json: {message: @folder.errors.details} 
        end
    end

    
    private
    def folder_params
        params.require(:folder).permit(:title)
    end

end
