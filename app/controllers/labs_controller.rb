class LabsController < ApplicationController
	before_action :authenticate_user!, except: [:index, :show]
	before_action :check_admin, except: [:index, :show]
	def index
		@labs = Lab.all
		@random_site =  Site.order('created_at DESC').limit(10).sample
		@random_name = @random_site.name
		@random_screen = @random_site.screens.sample
	end

	def show
		@lab = Lab.find_by_id(params[:id])
		if @lab
			@sites = @lab.sites.page(params[:page])
			@user_havent_site_for_lab = (user_signed_in? and not current_user.sites.where(lab_id: @lab.id).exists?)
		else
			redirect_back
		end
	end

	def new
		@lab = Lab.new
	end

	def create
		@lab = Lab.new(lab_params)
		if @lab.save
			redirect_to @lab
		else
			render 'new'
		end
	end

	def edit
		@lab = Lab.find params[:id]
	end

	def update
		@lab = Lab.find params[:id]
		if @lab.update(lab_params)
			redirect_to @lab
		else
			render 'edit'
		end
	end

	private
	def check_admin
		unless current_user.is_admin?
			redirect_back
		end
	end

	def lab_params
		params.require(:lab).permit(:task)
	end
end
