class RestaurantSearch < Searchlight::Search
  search_on Restaurant.all
  searches :q

  def search_q
    search.where("restaurants.name ILIKE :q OR restaurants.address ILIKE :q", q: "%#{q}%")
  end
end
