class LabsController < ApplicationController
	def index
		@labs = Lab.all
		@random_site =  Site.order('created_at DESC').limit(10).sample
		@random_name = @random_site.name
		@random_screen = @random_site.screens.sample
	end

	def show
		@lab = Lab.find_by_id(params[:id])
		if @lab
			@sites = @lab.sites
			@user_havent_site_for_lab = (user_signed_in? and not current_user.sites.where(lab_id: @lab.id).exists?)
		else
			redirect_back
		end
	end
end
