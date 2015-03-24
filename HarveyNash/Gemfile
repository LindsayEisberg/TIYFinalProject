source 'https://rubygems.org'


gem 'rails', '4.2.0'

gem 'rails-api'

gem 'spring', :group => :development


gem 'sqlite3'

# we need to get some secret API keys in a development environment
gem 'dotenv-rails', :groups => [:development, :test], :require => 'dotenv/rails-now'

# we are going to resolve rooms and all that stuff on the server
# side... there's a gem for that :-)
gem 'opentok'

# json web token
gem 'jwt'

# To use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# To use Jbuilder templates for JSON
gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano', :group => :development

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

# prevent CORS issues in development environment
gem "rack-cors"

# setup testing environment
group :test do
  gem 'rspec-rails'
  gem 'factory_girl_rails'
  gem 'database_cleaner'
  gem 'shoulda'
end

# use byebug to help debug
gem "byebug", :groups => [:development, :test]
