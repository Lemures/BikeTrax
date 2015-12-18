class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :firstname
      t.string :lastname
      t.string :access_token
      t.text :tracker_name
      t.text :tracker_id

      t.timestamps null: false
    end
  end
end
