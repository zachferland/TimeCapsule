module MailHelper

	def image_url(file)
  	ENV["DOMAIN"] + path_to_image(file)
	end

end