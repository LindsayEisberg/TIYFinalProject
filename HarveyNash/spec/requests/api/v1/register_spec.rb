require 'rails_helper'

describe 'Register' do
  describe '#create' do

    it "should return a 200 status with valid parameters" do
      post "/api/v1/register", {
                                email: 'tnesland@gmail.com',
                                username: 'tnesland',
                                password: 'password'
                               }
      expect(response.status).to eq 200
    end

    it "should return a 406 status with invalid parameters" do
      post "/api/v1/register", {
                                email: 'tnesland@gmail.com'
                               }

      expect(response.status).to eq 406
    end
  end
end
