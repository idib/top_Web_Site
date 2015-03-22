class LabsController < ApplicationController
  def index
  	@labs = Lab.all
  end
end
