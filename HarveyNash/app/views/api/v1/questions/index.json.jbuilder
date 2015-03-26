json.questions @questions do |question|
  json.id question.id
  json.id question.order_idx
  json.tet question.text
  json.open question.open
  json.user_id question.user_id
  json.username question.user.username
end
