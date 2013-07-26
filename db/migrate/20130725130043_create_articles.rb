class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :url
      t.datetime :saved_at
      t.datetime :send_at

      t.timestamps
    end
  end
end
