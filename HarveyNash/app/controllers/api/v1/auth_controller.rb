module Api
  module V1
    class AuthController < ActionController::API
      skip_before_action :authenticate_request # this will be implemented later
      # POST /api/v1/auth
      def authenticate
        user = User.find_by_credentials(params[:email], params[:password]) # you'll need to implement this
        if user
          render json: { id: user.id, auth_token: user.generate_auth_token }, status: 200
        else
          render json: { error: 'Invalid username or password' }, status: 401
        end
      end
    end
  end
end
