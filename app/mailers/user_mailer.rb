class UserMailer < ActionMailer::Base
 
  default :from => 'past@timecapsule.io'

  helper :mail

  def article_email(user, articles)
  	@user = user
  	@articles = articles
    mail( :to => @user.email,
    	:subject => 'Articles Have Arrived',
    	:fromname => 'Timecapsule.io' )
  end


end