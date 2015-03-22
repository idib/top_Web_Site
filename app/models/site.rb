class Site < ActiveRecord::Base
	serialize :screens, Array
end
