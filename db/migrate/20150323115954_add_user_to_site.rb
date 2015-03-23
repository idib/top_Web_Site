class AddUserToSite < ActiveRecord::Migration
  def change
    add_reference :sites, :user, index: true, foreign_key: true
  end
end
