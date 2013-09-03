class ProtectedPagesController < ApplicationController
  before_filter :authenticate_user!

  def intro 
  	@user = current_user

  	respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @user }
    end
  end 

end
