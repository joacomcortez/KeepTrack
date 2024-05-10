class User < ApplicationRecord
    has_many :folders

    def folders_with_todos
        folders.includes(:todos)
    end

end
