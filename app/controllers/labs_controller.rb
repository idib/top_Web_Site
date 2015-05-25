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
		render json: @labs.map { |l| {number: l.id, name: l.task} }
	end

	def show
		lab = Lab.find_by_id(params[:id])
		if lab
			sites = lab.sites
			if user_signed_in?
				site = current_user.sites.where(lab_id: lab.id)
				user_have_site = site.exists?
				if user_have_site
					sites = (site[0] + sites).uniq
				end
			end
			render json: {
				labs: sites.map { |s| 
						{number: s.id,
							name: s.name, 
							author: s.user.name, 
							group: s.user.group,
							scr: view_context.cl_image_path(s.screens.sample)
						}
					},
				user_have_site: user_have_site 
			}
		else
			render status: 404
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
