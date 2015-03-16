require 'rails_helper'
require 'byebug'

describe 'Auth' do
  # /api/v1/auth
  describe '#authenticate' do

    # Success
    it "should return the access token on success" do
      user = FactoryGirl.create(:user)
      post "/api/v1/auth", { email: 'tnesland@gmail.com', password:'password' }
      expect(JSON.parse(response.body)['auth_token']).to eq user.generate_auth_token
    end
    
    it "should return a 200 status on success" do
      user = FactoryGirl.create(:user)
      post "/api/v1/auth", { email: 'tnesland@gmail.com', password:'password' }
      expect(response.status).to eq 200
    end

    it "should return a 401 status with an invalid login" do
      user = FactoryGirl.create(:user)
      post "/api/v1/auth", { email: 'tnesland@gmail.com', password: 'wrong' }
      expect(response.status).to eq 401
    end
  end
end
