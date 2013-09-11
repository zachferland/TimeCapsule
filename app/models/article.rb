class Article < ActiveRecord::Base
  # attr_accessible   

   belongs_to :user

  def self.mail
  	self.fetch_articles().each do |user, articles|
  		#get user
  		@user = self.get_user(user)
  		# email articles
  		UserMailer.article_email(@user, articles).deliver
  	end
  end

  private 
  def self.get_user(user)
	   User.find(user)
  end

  private 
  def self.fetch_articles
  	articles = Article.where(send_at: Time.now.midnight..(Time.now.midnight + 1.day))
  	articles_users = articles.group_by { |t| t.user_id}
  end
 
end
