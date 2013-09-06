class AddProviderAndUidToUsers < ActiveRecord::Migration
  def change
    add_column :users, :provider, :string
    add_column :users, :string, :string
    add_column :users, :uid, :string
    add_column :users, :string, :string
  end
end
