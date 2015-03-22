class Site < ActiveRecord::Base
	belongs_to :lab
	serialize :screens, Array
end
