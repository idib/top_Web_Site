class RemoveLikesPerSiteFromUser < ActiveRecord::Migration
  def change
    remove_column :users, :likes_per_site, :text
  end
end
