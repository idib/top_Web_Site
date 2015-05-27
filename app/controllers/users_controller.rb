class UsersController < ApplicationController
	before_action :authenticate_user!, except: [:whoami]

	def whoami
		if current_user.nil?
			status  = "unauthorized"
		else
			if current_user.is_admin
				status = "admin"
			else
				status = "user"
			end
		end
		render json: {status: status}
	end
end
