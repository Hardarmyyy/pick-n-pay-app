module.exports = {
  apps: [
    {
      name: "PICKNPAY-APP_SERVER",
      script: "index.js",
      instances: 2, // can lauch many instance in production to enable load balancing
      max_memory_restart: "300M",
      shutdown_with_message: true,
      wait_ready: true,
      listen_timeout: 10000,
      // Logging
      out_file: "logs/out.log",  //  ./out.log to monitor logging
      error_file: "logs/error.log",
      merge_logs: true,
      log_date_format: "DD-MM HH:mm:ss Z",
      log_type: "json"
    }
  ],
}

