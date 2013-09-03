class ApplicationController < ActionController::Base
  protect_from_forgery

  def after_signup_path_for(resource)
    intro_path
  end

end
