json.session do
  json.id @session.id
  json.name @session.name
  json.date @session.start_time
  json.description @session.description
  json.active @session.active
  json.moderators @moderators do |moderator| 
    json.id moderator.user.id
    json.username moderator.user.username
    json.email moderator.user.email
    json.centerStage moderator.center_stage
    json.present moderator.present
  end
  json.subscribers @subscribers do |subscriber|
    json.id subscriber.user.id
    json.username subscriber.user.username
    json.email subscriber.user.email
    json.centerStage subscriber.center_stage
    json.present subscriber.present
  end
end
