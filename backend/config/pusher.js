const Pusher = require("pusher");

const pusher = new Pusher({
    app_id : "1961932",
    key :"fd3880d41daa3cfa5579",
    secret :"abca0f8af59b176ff304",
    cluster : "ap2",
  useTLS: true
});

module.exports = pusher;
