class AddLabToSite < ActiveRecord::Migration
  def change
    add_reference :sites, :lab, index: true, foreign_key: true
  end
end
