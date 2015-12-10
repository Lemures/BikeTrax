class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :firstname
      t.string :lastname
      t.string :access_token
      t.string :device_token

      t.timestamps null: false
    end
  end
end
