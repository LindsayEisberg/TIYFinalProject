class CreateSessionsUsersJoinTable < ActiveRecord::Migration
  def change
    create_table :session_users, id: false do |t|
      t.integer :session_id, null: false
      t.integer :user_id, null: false
      t.string :role, null: false

      t.timestamps null: false
    end
  end
end
