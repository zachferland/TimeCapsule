class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :url
      t.datetime :send_at

      t.timestamps
    end
  end
end
