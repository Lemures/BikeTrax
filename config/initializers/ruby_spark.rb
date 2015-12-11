RubySpark.configuration do |config|
  config.access_token = ENV['PARTICLE_ACCESS_TOKEN']
  config.timeout      = 10.seconds # defaults to 30 seconds
end