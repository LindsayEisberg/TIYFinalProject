require 'opentok'
require 'dotenv' ; Dotenv.load '.env'

module Api
  module V1
    class SessionsController < ApplicationController
      @@opentok = OpenTok::OpenTok.new(ENV['OPENTOK_API_KEY'], ENV['OPENTOK_API_SECRET'])

      # Return all active sessions
      def active_sessions
        render json: Session.where("active = ?", true)
      end

      # create a new opentok session
      def open
        session = @@opentok.create_session({media_mode: :routed})
        @session = Session.create(session_id: session.session_id,
                                  active: true)
        render json: @session
      end

      # return credentials for a given room (and possibly user)
      def credentials
        session = Session.find_by(id: params[:id])
        if params[:userId] and user = User.find_by(id: params[:userId])
          user_id = user.id
          username = user.username
          if session_user = SessionUser.find_by(user_id: user.id, session_id: params[:id])
            role = session_user.role.to_sym
          else
            role = :publisher
          end
        else
          user_id = nil          
          username = "unknown"
          role = :subscriber
        end
        token = @@opentok.generate_token(session.session_id, {role: role, data: "user_id=#{user_id}"})
        result = {
                  OTApiKey: ENV['OPENTOK_API_KEY'],
                  OTSessionId: session.session_id,
                  OTToken: token,
                  userId: user_id,
                  username: username,
                  role: role
                 }
        render json: result
      end
        
      # get info for a given session
      def show
        @session = Session.find_by(id: params[:id])
        @moderators = @session.moderators
        @subscribers = @session.publishers
      end

      # close an active sesion
      def close
        session = Session.find_by(id: params[:id])
        session.update(active: false)
      end

      # generate a token for a given opentok session
      def token
        session = Session.find_by(id: params[:id])
        token = @@opentok.generate_token(session.session_id)
        render :json => { OtToken: token }
      end

    end
  end
end
