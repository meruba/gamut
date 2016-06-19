class CustomerSearch < Searchlight::Search
  search_on User.all
  searches :q

  def search_q
    search.where("users.identification ILIKE :q OR users.name ILIKE :q OR users.email ILIKE :q", q: "%#{q}%")
  end
end
