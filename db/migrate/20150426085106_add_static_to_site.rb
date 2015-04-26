class AddStaticToSite < ActiveRecord::Migration
  def change
    add_column :sites, :static_id, :string
    add_column :sites, :static_link, :string
  end
end
