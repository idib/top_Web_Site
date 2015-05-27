class LabsController < ApplicationController
	before_action :authenticate_user!, except: [:index, :show, :main, :table]
	before_action :check_admin, except: [:index, :show, :main, :table]
	def main
		@lab = Lab.new
	end

	def index
		@labs = Lab.all.order('created_at')
		render json: @labs.map { |l| {id: l.id, task: l.task} }
	end

	def show
		lab = Lab.find_by_id(params[:id])
		if lab
			sites = lab.sites
			if user_signed_in?
				site = current_user.sites.where(lab_id: lab.id)
				user_hasnt_site = !site.exists?
				unless user_hasnt_site
					sites = (site + sites).uniq
				end
			end
			
			render json: {
				sites: sites.map { |s| 
						screen_urls = s.screens.map {|scr| 
							{good: view_context.cl_image_path(scr, quality: 75),
								bad: view_context.cl_image_path(scr, crop: :fill, width: 250, height: 200),
								id: scr}
							}
						{id: s.id,
							name: s.name, 
							link: s.link,
							hosted: s.static_link,
							author: s.user.name, 
							users_site: (user_signed_in? and s.user.id == current_user.id),
							group: s.user.group,
							first_screen: screen_urls[0],
							screens: (screen_urls[1..-1] or []),
							likes: s.likes,
							user_like: (user_signed_in? and current_user.likes[s.id])
						}
					},
				user_hasnt_site: user_hasnt_site 
			}
		else
			head 404
		end
	end

	def table
		@labs = Lab.all.order('created_at')
		@sites = Site.all
		@groups = User.all.map { |u| u.group }.uniq
		render 'labs/table', layout: false
	end

	def create
		@lab = Lab.new(lab_params)
		@lab.save
		redirect_back
	end

	def update
		@lab = Lab.find params[:id]
		@lab.update(lab_params)
		redirect_back
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
