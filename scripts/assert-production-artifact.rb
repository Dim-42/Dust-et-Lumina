#!/usr/bin/env ruby
# frozen_string_literal: true

# Defense in depth for the production Jekyll build. The production config
# excludes dev/, and this assertion fails the build if it nevertheless leaks
# into the generated artifact.

require "pathname"

site_dir = Pathname.new(ARGV[0] || "_site").expand_path
dev_dir = site_dir.join("dev")

abort "Production artifact is missing: #{site_dir}" unless site_dir.directory?
abort "Production artifact is missing index.html" unless site_dir.join("index.html").file?
abort "Development pages leaked into production artifact: #{dev_dir}" if dev_dir.exist?

puts "Production artifact assertion passed: dev/ is absent."
