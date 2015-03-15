require 'rails_helper'

describe 'Register' do
  describe '#create' do
    let(:params) {{format: :json, user: {
                                         username: 'tnesland',
                                         email: 'tnesland@gmail.com',
                                         password: 'password'
                                        }}}
    it "should return 200 with valid params" do
      post "/api/v1/register", params
      expect(response).to be_success
    end
  end
end
