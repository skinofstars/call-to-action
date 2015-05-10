# unicorn-development config

working_directory "/vagrant"

pid "/vagrant/tmp/pids/unicorn.pid"

stderr_path "/vagrant/log/unicorn.log"
stdout_path "/vagrant/log/unicorn.log"

listen "/tmp/unicorn.cta.sock"

worker_processes Integer(ENV["WEB_CONCURRENCY"] || 4)

timeout 60

preload_app false

before_fork do |server, worker|
  Signal.trap 'TERM' do
    puts 'Unicorn master intercepting TERM and sending myself QUIT instead'
    Process.kill 'QUIT', pid
  end

  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.connection.disconnect!
end

after_fork do |server, worker|
  Signal.trap 'TERM' do
    puts 'Unicorn worker intercepting TERM and doing nothing. Wait for master to send QUIT'
  end

  # Create worker pids too
  child_pid = server.config[:pid].sub(/pid$/, "worker.#{worker.nr}.pid")
  system("echo #{Process.pid} > #{child_pid}")

  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.establish_connection
end
