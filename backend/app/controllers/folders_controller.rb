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
            render status: 200, json: {folder: @folder}
        else
            render status: 400, json: {message: @folder.errors.details} 
        end
    end

    def show
        @folder = Folder.find(params[:id])
        if @folder.exists?
            render status: 200, json: { folder: @folder }
        else
            render status: 400, json: { message: 'folder not found' }
        end
    end

    
    private
    def folder_params
        params.require(:folder).permit(:title)
    end

end
