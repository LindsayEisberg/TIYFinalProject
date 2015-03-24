class Session < ActiveRecord::Base
  has_many :tokens

  # session moderators
  def moderators
    User.where('id IN (SELECT DISTINCT user_id FROM session_users WHERE session_users.session_id =? AND session_users.role = "moderator")', self.id)
  end

  def publishers
    User.where('id IN (SELECT DISTINCT user_id FROM session_users WHERE session_users.session_id =? AND session_users.role = "publisher")', self.id)
  end
  
end
