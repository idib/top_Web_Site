class SitesController < ApplicationController
	before_action :check_owner, only: [:update, :edit, :delete_screen]
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
		lab_id = params[:lab_id]
		if Lab.exists?(lab_id)
			if current_user.sites.where(lab_id: lab_id).exists?
				flash[:notice] = 'У Вас уже есть сайт для этой лабы'
				redirect_back
			else
				@site = Site.new
			end
		else
			redirect_back
		end
	end

	def create
		unless current_user.sites.where(lab_id: params[:lab_id]).exists?
			if validate
				site = current_user.sites.create(name: params[:site][:name], screens: params[:screens], lab_id: params[:lab_id])
				redirect_to [site.lab, site]
			else
				@site = Site.new
				@site.name = params[:site][:name]
				@site.screens = params[:screens]
				render 'new'
			end
		end
	end

	def edit
		@site = Site.find params[:id]
	end

	def delete_screen
		site = Site.find(params[:id])
		site.screens.delete(params[:screen_url])
		site.save
		render nothing: true
	end

	def update
		@site = Site.find params[:id]
		if validate
			@site.name = params[:site][:name]
			@site.screens += params[:screens]
			@site.save
			flash[:notice] = "Изменения успешно сохранены"
			redirect_back
		else
			render 'edit'
		end
	end

	def index
		if Lab.exists? params[:lab_id]
			lab = Lab.find params[:lab_id]
			redirect_to lab_path(lab)
		else
			redirect_back
		end
	end

	def show
		@site = Site.find params[:id]
	end

	private
	def validate
		params[:screens] ||= []
		params[:screens].map! { |scr|
			preloaded = Cloudinary::PreloadedFile.new(scr)
			if preloaded.valid?
				preloaded.identifier
			else
				""
			end
		}
		params[:screens].delete ""
		if params[:site][:name].size > 150
			flash[:notice] = notice
			false
		else
			true
		end
	end

	def check_owner
		site = Site.find_by_id params[:id]
		if current_user.id != site.user.id
			redirect_to :root
		end
	end
end
