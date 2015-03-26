class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.text :text
      t.boolean :open, default: true
      t.integer :order_idx, null: false
      t.integer :session_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
  end
end
