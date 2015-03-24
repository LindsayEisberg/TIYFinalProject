json.session do
  json.id @session.id
  json.name @session.name
  json.created @session.created_at  
  json.description @session.description
  json.active @session.active
  json.moderators @moderators do |moderator| 
    json.id moderator.id
    json.username moderator.username
    json.email moderator.email
  end
  json.subscribers @subscribers do |subscriber|
    json.id subscriber.id
    json.username subscriber.username
    json.email subscriber.email
  end
end
