import EventEmitter from "events"

class TimerEmitter extends EventEmitter { }

const emitter = new TimerEmitter()

emitter.on('timerTick', ([usersDate, timer]) => {
    const dateNow = new Date()
    const getTime = (sec) => {
        const timeArr = [
            Math.floor(sec % 60),
            Math.floor((sec / 60) % 60),
            Math.floor((sec / (60 * 60)) % 24),
            Math.floor(sec / (60 * 60 * 24))
        ]
        return `${timeArr.pop()} days ${timeArr.pop()} hours ${timeArr.pop()} minuts ${timeArr.pop()} seconds`
    }
    if (dateNow >= usersDate) {
        emitter.emit('timerEnd', timer)
    } else {
        console.log(getTime((usersDate - dateNow) / 1000))
    }
})
emitter.on('timerEnd', timer => {
    clearInterval(timer)
    console.log('Time is up')
})

const run = (usersDate) => {
    setInterval(function () {
        emitter.emit('timerTick', [usersDate, this])
    }, 1000)
}

for (const arg of process.argv.slice(2)) {
    const [hour, day, month, year] = arg.split('-')
    const usersDate = new Date(year, month - 1, day, hour)
    if (isNaN(usersDate)) continue
    run(usersDate)
}

