# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Timecapsule::Application.initialize!

ActionMailer::Base.smtp_settings = {
  :user_name => 'zfer',
  :password => 'this100something',
  :domain => 'localhost:3000',
  :address => 'smtp.sendgrid.net',
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}
