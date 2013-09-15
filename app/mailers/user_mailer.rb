class UserMailer < ActionMailer::Base
 
  # default :from => 'past@timecapsule.io'

  helper :mail

  def article_email(user, articles)
  	@user = user
  	@articles = articles
    mail( :to => @user.email,
    	:subject => 'Your Articles Have Arrived',
    	:from => 'past@timecapsule.io',
    	:fromname => 'Timecapsule.io' )
  end


  def welcome_email(user)
  	@user = user
  	mail( :to => @user.email,
    	:subject => 'Welcome to Timecapsule.io',
    	:from => 'welcome@timecapsule.io',
    	:fromname => 'Timecapsule.io' )
  end

  def test_email
  	mail( :to => "zachferland@gmail.com",
    	:subject => 'Hi this a test!',
    	:from => 'welcome@timecapsule.io',
    	:fromname => 'Timecapsule.io' )
  end



end