class AddNameToSite < ActiveRecord::Migration
  def change
    add_column :sites, :name, :string
  end
end
