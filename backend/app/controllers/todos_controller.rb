class TodosController < ApplicationController

    def index
        @todos = Todo.all
        render json: @todos
    end

    def edit
        @todo = Todo.find(params[:id])
        if @todo.update(todo_params)
            render status: 200, json: { todo: @todo }
        else
            render status: 400, json: { message: @todo.error.details }
        end
    end

    def create
        @todo = Todo.new(title: params[:title])
        @folder = Folder.find_by(id: params[:folderId])
        @todo.folder = @folder
        if @todo.save
            render status: 200, json: { todo: @todo }
        else
            render status: 400, json: { message: @todo.error.details }
        end
    end

    def show
        @todo = Todo.find(params[:id])
        if @todo.exists?
            render status: 200, json: { todo: @todo }
        else
            render status: 400, json: { message: 'To do not found' }
    end
    end

    def checkMarks
        @todo = Todo.find(params[:id])
        @todo.check = !@todo.check
        if @todo.save
            render status: 200, json: { todo: @todo }
        else
            render status: 400, json: { message: 'To do not found' }
        end
    end

    def destroy
        @todo = Todo.find(params[:id])
        @todo.destroy
        if @todo.exists?
            render status: 200, json: { message: 'To do deleted' }
        else
            render status: 400, json: { message: 'Could not delete' }
        end
    end
    

    
    private
    def todo_params
        params.require(:todo).permit(:title)
    end

end
