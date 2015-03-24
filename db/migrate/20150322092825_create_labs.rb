class CreateLabs < ActiveRecord::Migration
  def change
    create_table :labs do |t|
      t.text :task

      t.timestamps null: false
    end
  end
end
