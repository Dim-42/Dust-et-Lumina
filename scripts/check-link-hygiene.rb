#!/usr/bin/env ruby
# frozen_string_literal: true

require "find"
require "cgi"
require "pathname"
require "uri"

ROOT = File.expand_path("..", __dir__)
BASEURL = "/" + "Dust-et-Lumina"

SOURCE_EXTENSIONS = %w[.md .html .yml .yaml .scss .css .js .rb].freeze
SKIP_DIRS = %w[.git _site .jekyll-cache .sass-cache vendor .bundle .obsidian node_modules].freeze
EXTERNAL_SCHEME = /\A(?:https?:|mailto:|tel:|javascript:|data:|blob:)/i
MARKDOWN_DUPLICATE_LINK = /\[[^\]\r\n]+\]\([^\)\r\n]+\)\([^\)\r\n]+\)/

def source_files
  files = []

  Find.find(ROOT) do |path|
    rel = Pathname.new(path).relative_path_from(Pathname.new(ROOT)).to_s.tr("\\", "/")
    if File.directory?(path) && SKIP_DIRS.include?(File.basename(path))
      Find.prune
      next
    end

    next unless File.file?(path)
    next unless SOURCE_EXTENSIONS.include?(File.extname(path).downcase)

    files << [path, rel]
  end

  files
end

def read_text(path)
  File.read(path, mode: "rb").encode("UTF-8", invalid: :replace, undef: :replace)
end

def strip_url_noise(url)
  CGI.unescapeHTML(url).split(/[?#]/, 2).first.to_s
end

def decode_path(path)
  URI::DEFAULT_PARSER.unescape(path)
rescue ArgumentError
  path
end

def existing_generated_target?(build_root, source_html, raw_url)
  cleaned = strip_url_noise(raw_url.strip)
  return true if cleaned.empty? || cleaned == "/" || cleaned.start_with?("#")
  return true if cleaned.match?(EXTERNAL_SCHEME)
  return true if cleaned.start_with?("{{")

  candidate =
    if cleaned.start_with?(BASEURL + "/")
      File.join(build_root, decode_path(cleaned.delete_prefix(BASEURL + "/")))
    elsif cleaned.start_with?("/")
      File.join(build_root, decode_path(cleaned.delete_prefix("/")))
    else
      File.expand_path(decode_path(cleaned), File.dirname(source_html))
    end

  return true if File.file?(candidate)
  return true if File.directory?(candidate) && File.file?(File.join(candidate, "index.html"))
  return true if File.file?("#{candidate}.html")
  return true if File.file?(File.join(candidate, "index.html"))

  false
rescue SystemCallError, ArgumentError
  false
end

errors = []

source_files.each do |path, rel|
  text = read_text(path)

  if rel != "_config.yml" && text.include?(BASEURL)
    errors << "#{rel}: hardcoded configured baseurl"
  end

  text.each_line.with_index(1) do |line, line_number|
    next unless line.match?(MARKDOWN_DUPLICATE_LINK)

    errors << "#{rel}:#{line_number}: malformed duplicate Markdown link suffix"
  end
end

build_root = ARGV[0] ? File.expand_path(ARGV[0], Dir.pwd) : File.join(ROOT, "_site")

if Dir.exist?(build_root)
  css_path = File.join(build_root, "assets", "css", "style.css")
  if File.file?(css_path)
    css = read_text(css_path)
    if css.include?("#{BASEURL}/assets/fonts") || css.include?("#{BASEURL}/assets/icons")
      errors << "#{Pathname.new(css_path).relative_path_from(Pathname.new(ROOT))}: generated CSS hardcodes font/icon baseurl"
    end
  end

  Find.find(build_root) do |path|
    next unless File.file?(path)
    next unless File.extname(path).downcase == ".html"

    generated_rel = Pathname.new(path).relative_path_from(Pathname.new(build_root)).to_s.tr("\\", "/")
    next if generated_rel.start_with?("templates/")

    html = read_text(path)
    html.scan(/\b(?:href|src)\s*=\s*(["'])(.*?)\1/i) do |_quote, raw_url|
      next if existing_generated_target?(build_root, path, raw_url)

      errors << "#{generated_rel}: unresolved local target #{raw_url}"
    end
  end
else
  errors << "#{build_root}: build output directory does not exist"
end

if errors.empty?
  puts "Link hygiene scan passed."
else
  warn "Link hygiene scan failed:"
  errors.each { |error| warn "  - #{error}" }
  exit 1
end
