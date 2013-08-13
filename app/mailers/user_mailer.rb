class UserMailer < ActionMailer::Base
 
  default :from => 'any_from_address@example.com'

  # send a signup email to the user, pass in the user object that contains the user's email address
  def article_email(user, articles)
  	@user = user
  	@articles = articles
    mail( :to => @user.email,
    :subject => 'Hello' )
  end


end