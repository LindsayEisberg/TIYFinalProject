class AddPresenceColumnToSessionUsers < ActiveRecord::Migration
  def change
    add_column :session_users, :present, :boolean, default: false
  end
end
