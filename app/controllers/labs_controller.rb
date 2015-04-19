class LabsController < ApplicationController
	before_action :authenticate_user!, except: [:index, :show, :main]
	before_action :check_admin, except: [:index, :show, :main]
	def main
		@random =  Site.order('created_at DESC').limit(10).shuffle[0..2].map { |site|
			OpenStruct.new({:name => site.name, :screen => site.screens.sample, :site => site})
		}
	end

	def index
		@labs = Lab.all.order('created_at')
		@table_view = params[:view] == "table"
		if @table_view
			@sites = Site.all
			@groups = User.all.map { |u| u.group }.uniq
		end
	end

	def show
		@lab = Lab.find_by_id(params[:id])
		if @lab
			@sites = @lab.sites.page(params[:page])
			if user_signed_in?
				@user_site = current_user.sites.where(lab_id: @lab.id)[0]
				@user_havent_site_for_lab = @user_site.nil?
			end
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
