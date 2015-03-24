class User < ActiveRecord::Base
  has_many :session_users
  has_many :sessions, :through => :session_users
  
  attr_accessor :password
  validates_presence_of :password, :on => :create
  validates_presence_of :username, :email
  validates_uniqueness_of :username, :email

  before_save :encrypt_password

  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end

  def self.find_by_credentials(email, password)
    user = User.find_by email: email
    if user && user.password_hash ==
        BCrypt::Engine.hash_secret(password, user.password_salt)
      user
    else
      nil
    end
  end

  # http://adamalbrecht.com/2014/12/04/add-json-web-token-authentication-to-your-angular-rails-app/
  def generate_auth_token
    payload = { user_id: self.id }
    AuthToken.encode(payload)
  end
end
