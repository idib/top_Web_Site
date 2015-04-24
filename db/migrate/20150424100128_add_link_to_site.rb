class AddLinkToSite < ActiveRecord::Migration
  def change
    add_column :sites, :link, :string
  end
end
