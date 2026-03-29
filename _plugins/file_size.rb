puts ">>> SYSTEM_CHECK: FileSize Plugin Loaded Successfully"

module Jekyll
    module FileSizeFilter
        def file_size(input)
        return "0 B" if input.nil? || input.empty?
        clean_path = input.start_with?("/") ? input[1..-1] : input
        
        site_source = Jekyll.sites.first.source
        full_path = File.join(site_source, clean_path)

        if File.exist?(full_path)
            size = File.size(full_path).to_f
            puts "FILE_SIZE_FOUND"
            if size < 1024
            "#{size.to_i} B"
            elsif size < 1048576
            "#{(size / 1024).round(1)} KB"
            else
            "#{(size / 1048576).round(1)} MB"
            end
        else
            # This will print in your terminal so you can troubleshoot!
            puts "FILE_SIZE_ERROR: Could not find file at #{full_path}"
            "NOT_FOUND"
        end
        end
    end
    end

Liquid::Template.register_filter(Jekyll::FileSizeFilter)