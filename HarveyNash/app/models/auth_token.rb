# Code below taken from the following tutorial in an attempt to
# simplify our token based authentication:
# http://adamalbrecht.com/2014/12/04/add-json-web-token-authentication-to-your-angular-rails-app/
# This will be extended and customized later.

class AuthToken

  # encode an access token for a user that expires in a day
  def self.encode(payload, exp=24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  # decode an access token for a given user
  def self.decode(token)
    payload = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
    DecodeAuthToken.new(payload)
  rescue
    # It will raise an error if it is not a token that was generated
    # with our secret key or if the user changes the contents of the
    # payload
    nil
  end
end

# We could just return the payload as a hash, but having keys with indifferent access is always nice, plus we get an expired? method that will be useful later
class DecodedAuthToken < HashWithIndifferentAccess
  def expired?
    self[:exp] <= Time.now.to_i
  end
end
