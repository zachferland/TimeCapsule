class Article < ActiveRecord::Base
  attr_accessible :send_at, :url, :summary, :title, :uid

   belongs_to :user

  def self.mail
  	# #fetch article expired grouped by user
  	# articles = Article.where(send_at: Time.now.midnight..(Time.now.midnight + 10.day))
  	# articles_users = articles.group(:uid, :id)

  	# articles_users.each do |user, articles|
  	# 	# puts user.name
  	# 	for article in articles
  	# 		puts article.title
  	# 	end
  	# end

  	puts Article.where(send_at: Time.now.midnight..(Time.now.midnight + 10.day)).group(:uid).count()
  end


  # Write a query that fetches the articles in order of ascending the articles send times that are less then the start of the next day and group them by user.

  # I will then get each user as an object

  # go through each user object and loop through each article they have

  # get title and summary wrap in some html and place it in the email template (var)

  # send the email through send grid


  
end
