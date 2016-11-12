function Timer(mins, target, cb) {
    this.counter = 0;
    this.target = target;
    this.callback = cb;
    var clock;
}
Timer.prototype.pad = function (s) {
    return (s < 10) ? '0' + s : s;
}
Timer.prototype.start = function (s) {
    this.count();
}
Timer.prototype.stop = function (s) {
    clearInterval(clock);
    self.done.call(self);
}
Timer.prototype.done = function (s) {
    if (this.callback) this.callback();
}
Timer.prototype.display = function (s) {
    this.target.innerHTML = this.pad(s);
}
Timer.prototype.count = function (s) {
    var self = this;
    self.display.call(self, self.counter);
    self.counter++;
    clock = setInterval(function () {
        self.display(self.counter);
        self.counter++;
    }, 1000);
}