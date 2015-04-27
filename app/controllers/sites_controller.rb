require 'zip'
class SitesController < ApplicationController
	before_action :check_owner, only: [:update, :edit, :delete_screen, :delete_static]
	before_action :authenticate_user!, except: [:show]
	def like
		site = Site.find_by_id(params[:id])
		if site
			like = current_user.like site
			if like
				site.likes += 1
			else
				site.likes -= 1
			end
			site.save
			render json: {like: like}
		else
			render json: {err: true}
		end
	end

	def new
		lab_id = params[:lab_id]
		if Lab.exists?(lab_id)
			if current_user.sites.where(lab_id: lab_id).exists?
				flash[:alert] = 'У Вас уже есть сайт для этой лабы'
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
				site = current_user.sites.create(post_params)
				unless params[:site][:upload_site].nil?
					site.upload_static params[:site][:upload_site].path
					site.save
				end
				redirect_to site.lab
			else
				@site = Site.new(post_params)
				render 'new'
			end
		else
			flash[:alert] = 'У Вас уже есть сайт для этой лабы'
			redirect_back
		end
	end

	def edit
		@site = Site.find params[:id]
	end

	def delete_screen
		site = Site.find(params[:id])
		site.screens.delete(params[:screen_url])
		if site.screens.empty?
			site.screens = [42]
			site.save
			site.screens = []
		end
		site.save
		render nothing: true
	end

	def delete_static
		site = Site.find(params[:id])
		site.delete_static
		site.save
		render nothing: true
	end

	def update
		@site = Site.find params[:id]
		if validate
			@site.name = params[:site][:name]
			@site.link = params[:site][:link]
			@site.screens += params[:screens]
			unless params[:site][:upload_site].nil?
				@site.upload_static params[:site][:upload_site].path
			end
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
		#@site = Site.find params[:id]
		redirect_back
	end

	private
	def validate
		params[:screens] ||= []
		if params[:site][:name].size > 75
			flash[:alert] = "Слишком длинное название"
			return false
		end
		site = params[:site][:upload_site]
		if site!= nil
			if site.tempfile.size > 2.megabytes
				flash[:alert] = "Слишком большой файл"
				return false
			end
			begin
				zip = Zip::File.open(site.path)
				if zip.glob("index.html") == []
					flash[:alert] = "Сайт должен иметь index.html"
					return false
				end
			rescue
				flash[:alert] = "Файл не является zip-архивом"
				return false
			ensure
				zip.close if zip
			end
		end
		params[:screens].map! { |scr|
			preloaded = Cloudinary::PreloadedFile.new(scr)
			if preloaded.valid?
				#change extension to jpg
				t = preloaded.identifier.split "."
				t[-1]="jpg"
				t.join "."
			else
				""
			end
		}
		params[:screens].delete ""
		return true
	end

	def check_owner
		site = Site.find_by_id params[:id]
		if current_user.id != site.user.id
			redirect_to :root
		end
	end

	def post_params
		{name: params[:site][:name], 
			screens: params[:screens], 
			lab_id: params[:lab_id],
			link: params[:site][:link]}
	end

end
