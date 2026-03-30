module Jekyll
    module FileSizeFilter
        def file_size(input)
        return "0 B" if input.nil? || input.empty?
        clean_path = input.start_with?("/") ? input[1..-1] : input
        
        site_source = Jekyll.sites.first.source
        full_path = File.join(site_source, clean_path)

        if File.exist?(full_path)
            size = File.size(full_path).to_f
            if size < 1024
            "#{size.to_i} B"
            elsif size < 1048576
            "#{(size / 1024).round(1)} KB"
            else
            "#{(size / 1048576).round(1)} MB"
            end
        else
            puts "FILE_SIZE_ERROR: Could not find file at #{full_path}"
            "NOT_FOUND"
        end
        end
    end
    end

Liquid::Template.register_filter(Jekyll::FileSizeFilter)

module Jekyll
    module GallerySortFilter
        def gallery_sort(collection)
        return collection unless collection.respond_to?(:sort)

        collection.sort do |a, b|
            # 1. Prioritize 'order' frontmatter
            # We use 99999 as default so items without 'order' appear at the bottom
            a_order = a.data['order'] || 99999
            b_order = b.data['order'] || 99999

            # Compare the orders
            comparison = a_order <=> b_order

            # 2. If orders are equal (or both are 99999), sort by title
            if comparison == 0
            a_title = a.data['title'].to_s.downcase
            b_title = b.data['title'].to_s.downcase
            comparison = a_title <=> b_title
            end

            comparison
        end
        end
    end
    end

Liquid::Template.register_filter(Jekyll::GallerySortFilter)