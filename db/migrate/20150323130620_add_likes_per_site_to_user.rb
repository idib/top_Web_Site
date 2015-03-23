class AddLikesPerSiteToUser < ActiveRecord::Migration
  def change
    add_column :users, :likes_per_site, :text
  end
end
