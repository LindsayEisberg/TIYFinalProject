module Api
  module V1
    class UsersController < ActionController::API

      def index
        @users = User.all
        render :json => @users
      end

      def show
        begin
          @user = User.find(params[:id])
          render :json => @user, :except => [:password_hash, :password_salt],
            status: 200
        rescue
          render json: { errors: "User not found."}, status: 404
        end
      end

      def create
        @user = User.new(user_params)
        if @user.save
          render json: { message: "User was registered" }, status: 200
        else
          render json: { :errors => @user.errors.as_json }, status: 406
        end
      end

      def update
        @user = User.find(params[:id])
        if @user.update(user_params)
          render json: { message: "User was updated" }, status: 200
        else
          render json: { :errors => @user.errors.as_json }, status: 406
        end
      end

      private
      def user_params
        params.permit(:username, :email, :password, :blurb)
      end
    end
  end
end
