class Article < ActiveRecord::Base
  attr_accessible :send_at, :url, :summary, :title
end
