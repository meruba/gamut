class ProductSearch < Searchlight::Search
  search_on Product.all
  searches :q

  def search_q
    search.where("products.name ILIKE :q", q: "%#{q}%")
  end
end
