class User < ApplicationRecord
    has_many :folders

    validates :username, uniqueness: true
end
