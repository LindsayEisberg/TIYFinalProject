class Session < ActiveRecord::Base
  has_many :tokens

  # session moderators
  def moderators
    SessionUser.joins(:user).where("session_id = ? and role = 'moderator'", self.id)
  end

  def publishers
    SessionUser.joins(:user).where("session_id = ? and role = 'publisher'", self.id)
  end
  
end
