module Api
  module V1
    class QuestionsController < ActionController::API

      def index
        @questions = Question.where("session_id = ?", params[:session_id])
        render :json => @questions
      end

      def show
        @question = Question.find(params[:id])
        render :json => @question
      end

      def create
        @question = Question.new(question_params)
        if @question.save
          render :json => @question, status: 200
        else
          render json: { :errors => @question.errors.as_json }, status: 500
        end
      end

      def update
        @question = Question.find(params[:id])
        if @question.update(question_params)
          render json: @question.to_json, status: 200
        else
          render json: { :errors => @question.errors.as_json }, status: 500
        end
      end

      def destroy
        @question = Question.find(params[:id])
        if @question.destroy
          render json: { message: "Question was DESTROYED!!!" }, status: 200
        else
          render json: { :errors => @question.errors.as_json }, status: 500
        end
      end

      private
      def question_params
        params.permit(:text, :open, :order_idx, :session_id, :user_id)
      end

    end
  end
end
