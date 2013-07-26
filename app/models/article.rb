class Article < ActiveRecord::Base
  attr_accessible :saved_at, :send_at, :url
end
