# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Timecapsule::Application.initialize!

ActionMailer::Base.smtp_settings = {
  :user_name => ENV["SENDGRID_USER_NAME"],
  :password => ENV["SENDGRID_PASSWORD"],
  :domain => ENV["SENDGRID_DOMAIN"],
  :address => 'smtp.sendgrid.net',
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}
