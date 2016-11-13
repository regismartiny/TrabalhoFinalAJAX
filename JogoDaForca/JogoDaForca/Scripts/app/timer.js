function Timer(seconds, $target, cb) {
    this.time = seconds;
    this.counter = seconds;
    this.$target = $target;
    this.callback = cb;
}
Timer.prototype.pad = function (s) {
    return (s < 10) ? '0' + s : s;
}
Timer.prototype.start = function (s) {
    this.count();
}
Timer.prototype.stop = function (s) {
    this.count();
}
Timer.prototype.reset = function (s) {
    this.counter = time;
}
Timer.prototype.done = function (s) {
    if (this.callback) this.callback();
}
Timer.prototype.display = function (s) {
    this.$target.text(this.pad(s));
}
Timer.prototype.count = function (s) {
    var self = this;
    self.display.call(self, self.counter);
    self.counter--;
    var clock = setInterval(function () {
        self.display(self.counter);
        self.counter--;
        if (self.counter < 0) {
            clearInterval(clock);
            self.done.call(self);
        }
    }, 1000);
}