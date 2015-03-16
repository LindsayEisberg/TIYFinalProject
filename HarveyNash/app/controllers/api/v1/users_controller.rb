module Api
  module V1
    class UsersController < ActionController::API

      def index
        @users = User.all
        render :json => @users
      end

      def create
        @user = User.new(user_params)
        if @user.save
          render json: { message: "User was registered" }, status: 200
        else
          render json: { :errors => @user.errors.as_json }, status: 406
        end
      end

      private
      def user_params
        params.permit(:username, :email, :password)
      end
    end
  end
end
