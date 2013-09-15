class AddSentToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :sent, :boolean, :default => false
  end
end
