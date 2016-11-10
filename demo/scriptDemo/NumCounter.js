function NumCounter(val, pointer, target, conf) {
    this._origin = {
        pointer,
        target,
        val: parseInt(val, 10)
    }
    this._config = Object.assign({}, NumCounter._config, conf)

    this.init()
}

NumCounter._config = {
    interval: 0,
    speed: 50,
    fill: '',
    direction: 'end'
}

NumCounter.prototype = {
    constructor: NumCounter,
    init() {
        const _org = this._origin
        const _conf = this._config
        _org.arr = _org.val.toString().split('').map(v => parseInt(v, 10))
        _org.valLen = _org.arr.length
        _org.valMax = Math.max(..._org.arr)
        _org.resArr = Array.from(new Array(_org.valLen), x => _conf.fill)
        this.counter = _conf.direction === 'end' ? _org.arr.length : -1
    },
    run() {
        const _conf = this._config
        const _org = this._origin
        if (this.counter < 0 || this.counter > _org.valLen) this.init()
        setTimeout(() => {
            _conf.direction === 'end' ? this.counter-- : this.counter++
            if (this.counter >= 0 && this.counter <= _org.valLen) this.increaser()
        }, _conf.interval)
    },
    increaser() {
        setTimeout(() => {
            const _org = this._origin
            const _conf = this._config
            if (_org.resArr[this.counter] === _conf.fill) _org.resArr[this.counter] = 0
            if (_org.resArr[this.counter] < _org.arr[this.counter]) {
                _org.resArr[this.counter]++
                _org.pointer[_org.target] = _org.resArr.join('')
                this.increaser()
            } else {
                this.run()
            }
        }, this._config.speed)
    }
}
