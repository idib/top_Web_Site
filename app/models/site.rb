class Site < ActiveRecord::Base
	belongs_to :lab
	belongs_to :user
	serialize :screens, Array

	def upload_static zip_path
		b = BitBalloon::Client.new(:access_token => ENV["BB_ACCESS_TOKEN"])
		if self.static_id.nil?
			s = b.sites.create(zip: zip_path)
			s.wait_for_ready
			self.static_id = s.id
			self.static_link = s.url
		else
			s = b.sites.get(self.static_id)
			deploy = s.deploys.create(zip: zip_path)
			deploy.wait_for_ready
		end
	end

	def delete_static
		unless self.static_id.nil?
			b = BitBalloon::Client.new(:access_token => ENV["BB_ACCESS_TOKEN"])
			s = b.sites.get(self.static_id)
			s.destroy!
			self.static_id = nil
			self.static_link = nil
		end
	end
end
