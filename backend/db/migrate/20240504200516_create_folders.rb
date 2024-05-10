class CreateFolders < ActiveRecord::Migration[7.1]
  def change
    create_table :folders do |t|
      t.string :title
      t.belongs_to :user, index: true, foreign_key: true
      t.timestamps
    end
  end
end
