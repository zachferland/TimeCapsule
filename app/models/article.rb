class Article < ActiveRecord::Base
  # attr_accessible   

   belongs_to :user

  def self.mail
  	self.fetch_articles().each do |user, articles|
  		#get user
  		@user = self.get_user(user)
  		# email articles
  		UserMailer.article_email(@user, articles).deliver

      for @article in articles
        @article.sent = true;
        @article.save
      end 
  	end
  end

  private 
  def self.get_user(user)
	   User.find(user)
  end

  private 
  def self.fetch_articles
  	articles = Article.where("send_at <= ? AND sent = ?", Time.now.midnight, false)
  	articles_users = articles.group_by { |t| t.user_id}
  end
 
end


