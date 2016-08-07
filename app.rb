require 'rubygems'
require 'sinatra'
require 'json'

set :public_folder, 'public'

get '/' do
  erb :index
end


