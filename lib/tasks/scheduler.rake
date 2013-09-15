task :send_articles => :environment do
  if Time.now.monday? or Time.now.wednesday? or Time.now.friday?
    Article.mail
  end
end


task :testing => :environment do
  if Time.now.monday? or Time.now.wednesday? or Time.now.sunday?
  	puts "Testing it"
  	sleep 3
  	puts "Done."
  end
end