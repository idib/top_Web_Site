class LabsController < ApplicationController
  def index
  	@labs = Lab.all
  end
   def show
  	@sites = Lab.find(params[:id]).sites
  end
end
