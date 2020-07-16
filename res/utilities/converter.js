/*
 *
 * File name: readFile.js
 * Description: node.js script for readme command
 * Authors: cestoliv
 * If you're a new WeBash contributor and worked on this file, please add your name here.
 *
 * This file is part of the WeBash project with is released under the terms of GNU Affero General Public License V3.0.
 * You should have received a copy of the GNU Affero General Public License along with WeBash. If not, see <https://www.gnu.org/licenses/>.
 *
 */

exports.bytesTo = (toContert, convertIn = "mb") => {
    switch(convertIn) {
        case "kb":
            return(Math.round(toContert/1000))
        case "mb":
            return(Math.round(toContert/1000000))
        case "gb":
            return(Math.round(toContert/1000000000))
        case "tb":
            return(Math.round(toContert/1000000000000))
    }
}

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

    return hours + "h" + minutes + "m, " + seconds + 's'
}