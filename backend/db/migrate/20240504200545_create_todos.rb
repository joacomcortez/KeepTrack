class CreateTodos < ActiveRecord::Migration[7.1]
  def change
    create_table :todos do |t|
      t.string :title
      t.boolean :check
      t.belongs_to :folder, index: true, foreign_key: true
      t.timestamps
    end
  end
end
