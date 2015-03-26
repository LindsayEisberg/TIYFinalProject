json.sessions @sessions do |session|
  json.id session.id
  json.name session.name
  json.description session.description
  json.active session.active
  json.date session.start_time
end
