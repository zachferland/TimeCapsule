class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  
  def all

    user = User.from_omniauth(request.env["omniauth.auth"])
    if user.persisted?
      flash.notice = "Signed in!"

      if params[:display] == "page"
        sign_in_and_redirect user
      else
        sign_in user
        redirect_to chrome_path
      end

    else
      session["devise.user_attributes"] = user.attributes
      redirect_to new_user_registration_url
    end
  end

  alias_method :twitter, :all

end
