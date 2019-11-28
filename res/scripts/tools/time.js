exports.msToTime = (duration) => {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds; 
}

exports.sToTime = (duration) => {
    hours = Math.floor(duration / 3600);
    duration %= 3600;
    minutes = Math.floor(duration / 60);
    seconds = duration % 60;

    return hours + "h" + minutes + " " + seconds + 's'
}