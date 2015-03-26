require 'opentok'
require 'dotenv' ; Dotenv.load '.env'

module Api
  module V1
    class SessionsController < ApplicationController
      @@opentok = OpenTok::OpenTok.new(ENV['OPENTOK_API_KEY'], ENV['OPENTOK_API_SECRET'])

      # render all sessions
      def index
        @sessions = Session.all
      end
      
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

      # create a new session
      def create
        session = Session.new
        session.name = params[:name]
        session.description = params[:description]
        session.start_time = params[:date]
        # TODO: need date
        # TODO: need topic
        session.active = true;
        # add ot_session.id
        ot_session = @@opentok.create_session({media_mode: :routed})
        session.session_id = ot_session.session_id
        # try and save the session
        saved = session.save
        # add moderators
        params[:moderators].each do |moderator|
          SessionUser.create(session_id: session.id, user_id: moderator[:id], role: 'moderator', center_stage: true)
        end
        # add subscribers
        params[:subscribers].each do |subscriber|
          puts subscriber
          SessionUser.create(session_id: session.id, user_id: subscriber[:id], role: 'publisher', center_stage: false)
        end
        if saved
          render json: {message: "Event: #{session.name} successfully added"}, status: 200
        else
          render json: {errors: session.errors.to_json}, status: 500
        end
      end

      # center stage users
      def center_stage
        center_stage_ids = SessionUser.where("session_id = ? and center_stage = ?",
                                             params[:id], true).map(&:user_id)
        render json: center_stage_ids
      end

      # add to center stage
      def center_stage_add
        user_id = params[:user_id]
        session_id = params[:id]
        session_user_record = SessionUser.where("session_id = ? and user_id = ?",
                                                session_id, user_id)[0]
        if session_user_record.update(center_stage: true)
          render json: {message: "#{user_id} added to center stage of session #{session_id}"},
            status: 200
        else
          render json: {errors: session_user_record.errors.to_json }, status: 500
        end
      end

      # remove from center stage
      def center_stage_remove
        user_id = params[:user_id]
        session_id = params[:id]
        session_user_record = SessionUser.where("session_id = ? and user_id = ?",
                                                session_id, user_id)[0]
        if session_user_record.update(center_stage: false)
          render json: {message: "#{user_id} removed from center stage of session #{session_id}"},
            status: 200
        else
          render json: { errors: session_user_record.errors.to_json }, status: 500
        end
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
        token = @@opentok.generate_token(session.session_id, {role: role, data: user.id})
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

      # should be called when a user joins a room
      def enter_room
        session = Session.find(params[:id])
        user_id = params[:user_id]
        # get the session user (this exists if the user is registered for the session)
        session_user = SessionUser.where("session_id = ? and user_id = ?", session.id, user_id)[0]
        if session_user
          # this user is now present
          session_user.update(present: true);
        end
        redirect_to :action => "show", :id => session.id        
      end

      # should be called when a user exits a room
      def exit_room
        session = Session.find(params[:id])
        user_id = params[:user_id]
        # get the session user (this exists if the user is registered for the session)
        session_user = SessionUser.where("session_id = ? and user_id = ?", session.id, user_id)[0]
        if session_user
          # this user is no longer present
          session_user.update(present: false);
        end
        redirect_to :action => "show", :id => session.id
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
