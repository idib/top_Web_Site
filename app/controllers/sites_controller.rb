class SitesController < ApplicationController
  def like
  	site = Site.find(params[:id])
  	site.likes += 1
  	site.save
  	redirect_to :back
  end
end
