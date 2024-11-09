/**
 * 
 * @param {*} endtime 
 * @returns [t,days,hours,minutes,seconds]
 * 
 *  Cette fonction calcule le temps restant jusqu'à une date spécifiée (endtime), 
 *  et retourne cet intervalle sous forme d'un objet contenant les jours, heures, minutes et secondes restants.
 * 
 * Cette fonction est utile, par exemple, dans la création d'un compte à rebours pour un événement futur. 
 * Vous pouvez appeler cette fonction et, 
 * lui passer la date de fin de l'événement pour obtenir le temps restant jusqu'à cet événement.
*/
function getTimeRemaining(endtime) {
    let t       = Date.parse(endtime) - Date.parse(new Date());
    let seconds  = Math.floor((t/1000) % 60);
    let minutes = Math.floor((t/1000 / 60) % 60);
    let hours   = Math.floor((t/ (1000 * 60 * 60)) % 24);
    let days    = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
        'total'     : t,
        'days'      : days,
        'hours'     : hours,
        'minutes'   : minutes,
        'seconds'   : seconds
    }
}

/**
 * 
 * @param {*} id 
 * @param {*} endtime 
 * 
 *  initialiser et mettre à jour un compte à rebours sur une page web.
*/
function initializeClock(id, endtime) {
    let clock       = document.getElementById(id);
    let daysSpan    = clock.querySelector('.days');
    let hoursSpan   = clock.querySelector('.hours');
    let minuSpan    = clock.querySelector('.minutes');
    let secSpan     = clock.querySelector('.secondes');
    
    function updateClock() {
        let t   = getTimeRemaining(endtime);

        daysSpan.innerHTML  = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minuSpan.innerHTML  = ('0' + t.minutes).slice(-2);
        secSpan.innerHTML   = ('0' + t.seconds).slice(-2);

        if(t.total <= 0) {
            clearInterval(timeInterval);
        }
    }

    updateClock();
    var timeInterval = setInterval(updateClock, 1000);
}

// 7 : days, 24 : hours, 60 : min, 60 : sec, 1000 : millisec
let deadline = new Date(Date.parse(new Date()) + 7 * 24 * 60 * 60 * 1000);
initializeClock('clockdiv', deadline);