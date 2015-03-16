require 'rails_helper'

describe 'User' do
  describe '#show' do

    context 'existing user' do
      it "should respond with user info for existing user" do
        user = FactoryGirl.create(:user)
        get "/api/v1/profile/#{user.id}"
        data = JSON.parse(response.body)
        expect(response.status).to eq 200
        expect(data["email"]).to eq "tnesland@gmail.com"
        expect(data["username"]).to eq "tnesland"
        expect(data["blurb"]).to eq "I am a software developer from Charleston, SC."
        expect(data.keys()).not_to include "password_hash"
        expect(data.keys()).not_to include "password_salt"
      end
    end

    context 'non-existent user' do
      it "should respond with error for non-existent user" do
        get "/api/v1/profile/100" # no user exists w/ ID of 100
        data = JSON.parse(response.body)
        expect(response.status).to eq 404
        expect(data["errors"]).to include "User not found."
      end
    end
  end

  # TODO: fix test
  describe '#update' do
    it "should update" do
      user = FactoryGirl.create(:user)
      patch "/api/v1/profile/#{user.id}", { blurb: "NewBlurb" }
      expect(user.blurb).to eq "NewBlurb"
    end
  end
end
