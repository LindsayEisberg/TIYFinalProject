class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.string :session_id
      t.boolean :active

      t.timestamps null: false
    end
  end
end
