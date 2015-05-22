class UsersController < ApplicationController
	before_action :authenticate_user!
	def profile
		@labs = Lab.all
		@sites = current_user.sites
	end

	def whoami
		render json: {is_admin: current_user.is_admin}
	end
end
