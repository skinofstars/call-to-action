class CreateCtas < ActiveRecord::Migration
  def change
    create_table :ctas do |t|
      t.string :title
      t.string :url
      t.string :keywords
      t.string :always

      t.timestamps null: false
    end
  end
end
