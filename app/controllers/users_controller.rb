class UsersController < ApplicationController
	before_action :authenticate_user!
	def profile
		@labs = Lab.all
		@sites = current_user.sites
	end
end
