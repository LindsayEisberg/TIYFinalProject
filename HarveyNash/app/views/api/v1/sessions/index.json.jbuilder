json.sessions @sessions do |session|
  json.id session.id
  json.name session.name
  json.description session.description
  json.active session.active
  json.data '10/20/15 12:00 AM'
end
