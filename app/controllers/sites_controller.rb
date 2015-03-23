class SitesController < ApplicationController
	before_action :authenticate_user!, only: [:like]
	def like
		site = Site.find(params[:id])
		if current_user.has_like_for? site
			site.likes += 1
			site.save
			current_user.like site
		else
			flash[:notice] = 'Вы уже голосовали за эту работу или Вы проголосовали за максимальное количество работ в этой лабе'
		end
		redirect_to :back
	end
end
