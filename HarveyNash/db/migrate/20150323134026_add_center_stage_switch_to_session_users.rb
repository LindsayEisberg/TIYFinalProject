class AddCenterStageSwitchToSessionUsers < ActiveRecord::Migration
  def change
    add_column :session_users, :center_stage, :boolean, default: false
  end
end
