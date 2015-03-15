module Api
  module V1
    class UsersController < ActionController::API

      def create
        @user = User.new(user_params)
        if @user.save
          render json: { status: :ok, message: "Success" }
        else
          render json: { error: 'User could not be created' }, status: 405
        end
      end

      private
      def user_params
        params.permit(:username, :email, :password)
      end
    end
  end
end
