class SitesController < ApplicationController
	before_action :authenticate_user!, except: [:show]
	def like
		site = Site.find_by_id(params[:id])
		if site
			if current_user.id == site.user.id
				flash[:notice] = 'Нельзя голосовать за свою работу'
			else
				if current_user.has_like_for?(site)
					site.likes += 1
					site.save
					current_user.like site
				else
					flash[:notice] = 'Вы уже голосовали за эту работу или Вы проголосовали за максимальное количество работ в этой лабе'
				end
			end
		end
		redirect_back
	end

	def new
		@lab_id = params[:lab_id]
		if Lab.exists?(@lab_id)
			if current_user.sites.where(lab_id: @lab_id).exists?
				flash[:notice] = 'У Вас уже есть сайт для этой лабы'
				redirect_back
			end
		else
			redirect_back
		end
	end

	def add_screens
		lab_id = params[:lab_id]
		if Lab.exists?(lab_id)
			sites = current_user.sites.where(lab_id: lab_id)
			if sites.count == 0
				site = current_user.sites.create(screens: params[:screens], lab_id: lab_id)
			else
				sites[0].screens += params[:screens]
				sites[0].save
			end
		end
		render :nothing => true
	end

	def create

	end

	def show
		
	end
end
