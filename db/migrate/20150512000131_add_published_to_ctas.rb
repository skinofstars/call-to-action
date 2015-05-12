class AddPublishedToCtas < ActiveRecord::Migration
  def change
    add_column :ctas, :published, :boolean, default: false
  end
end
