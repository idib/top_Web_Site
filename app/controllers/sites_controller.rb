class SitesController < ApplicationController
	before_action :authenticate_user!, only: [:like]
	def like
		site = Site.find_by_id(params[:id])
		if site
			if current_user.has_like_for? site
				site.likes += 1
				site.save
				current_user.like site
			else
				flash[:notice] = 'Вы уже голосовали за эту работу или Вы проголосовали за максимальное количество работ в этой лабе'
			end
		end
		redirect_to request.referer || :root
	end
end
