class AddDefaultSiteLikesValue < ActiveRecord::Migration
  def change
  	change_column_default(:sites, :likes, 0)
  end
end
