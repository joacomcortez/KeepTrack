class TodosController < ApplicationController
    def update
        @todo = Todo.find(params[:id])
        if @todo.update(todo_params)
            render status: 200, json: @todo 
        else
            render status: 400, json: { message: @todo.error.details }
        end
    end

    def create
        @folder = Folder.find_by(id: params[:folderId])
        # SI no existe el folder, devolver error

        @todo = Todo.new(title: params[:title])
        @todo.folder = @folder
        if @todo.save
            render status: 200, json: @todo 
        else
            render status: 400, json: { message: @todo.error.details }
        end
    end

    def checkMarks
        @todo = Todo.find(params[:id])
        # validar q existe todo

        @todo.check = !@todo.check
        if @todo.save
            render status: 200, json: @todo 
        else
            render status: 400, json: { message: 'To do not found' }
        end
    end
    
    private
    def todo_params
        params.require(:todo).permit(:title)
    end

end
