module Jekyll
  module GallerySortFilter
    def gallery_sort(collection)
      return collection unless collection.respond_to?(:sort)

      collection.sort do |a, b|
        a_order = a.data["order"] || 99999
        b_order = b.data["order"] || 99999

        comparison = a_order <=> b_order

        if comparison == 0
          a_title = a.data["title"].to_s.downcase
          b_title = b.data["title"].to_s.downcase
          comparison = a_title <=> b_title
        end

        comparison
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::GallerySortFilter)
