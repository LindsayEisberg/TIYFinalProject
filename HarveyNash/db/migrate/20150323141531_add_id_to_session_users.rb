class AddIdToSessionUsers < ActiveRecord::Migration
  def change
    add_column :session_users, :id, :primary_key
  end
end
