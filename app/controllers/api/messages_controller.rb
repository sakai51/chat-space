class Api::MessagesController < ApplicationController
  def index
    group = Group.find(params[:group_id])
    last_message_id = params[:id].to_i
    @messages = group.messages.includes(:user).where("id > #{params[:last_id]}")
  end
end