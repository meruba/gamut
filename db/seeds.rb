unless User.exists?(role: "admin")
  # create admin if there's no admin
  email = "admin@example.com"
  password = "12345678"
  User.create!(name: "admin system", email: email, password: password, role: "admin")
  puts "New user admin credentials: email: #{email} password: #{password}"
end

unless User.exists?(role: "restaurant")
  # create restaurant if there's no restaurant
  email = "restaurant@example.com"
  password = "12345678"
  User.create!(name: "restaurant example", email: email, password: password, role: "restaurant")
  puts "New user restaurant credentials: email: #{email} password: #{password}"
end

unless User.exists?(role: "customer")
  # create customer if there's no customer
  email = "customer@example.com"
  password = "12345678"
  User.create!(name: "Jhon doe", email: email, password: password, role: "customer")
  puts "New user customer credentials: email: #{email} password: #{password}"
end
