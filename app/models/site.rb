class Site < ActiveRecord::Base
	belongs_to :lab
	belongs_to :user
	serialize :screens, Array
	self.per_page = 20
end
