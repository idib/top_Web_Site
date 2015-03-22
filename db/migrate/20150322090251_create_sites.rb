class CreateSites < ActiveRecord::Migration
  def change
    create_table :sites do |t|
      t.integer :likes
      t.text :screens

      t.timestamps null: false
    end
  end
end
