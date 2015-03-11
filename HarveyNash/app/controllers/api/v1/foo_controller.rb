module Api
  module V1
    class FooController < ActionController::API

      def hello
        render json: {message: "Hello World!"}
      end

    end
  end
end
