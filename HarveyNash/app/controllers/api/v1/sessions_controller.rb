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

      # close an active sesion
      def close
        session = Session.find_by(id: params[:id])
        session.update(active: false)
      end
      
    end
  end
end
