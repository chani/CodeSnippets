function updateCountdowns() {
    for (var i = 0; i < countDowns.length; ++i) {
        if (!countDowns[i].obj.isFinished()) {
            updateSingleCountdown(i);
        }
    }
    window.setTimeout("updateCountdowns()", 1000);
}

function updateSingleCountdown(counterIndex) {
    var counterId = countDowns[counterIndex].id;
    var targetElement = document.getElementById(countDownsPrefix + counterId);
    if (targetElement) {
        var oldDays = countDowns[counterIndex].obj.d;
        countDowns[counterIndex].obj.decrease();
        if ((oldDays > 0) && (countDowns[counterIndex].obj.d == 0)) {
            for (var i = targetElement.children.length - 1; i >= 0; --i) {
                targetElement.children[i].remove();
            }
        }
        var showDaysPart = (targetElement.className.indexOf('showDays') > -1) && (countDowns[counterIndex].obj.d > 0);        
        if ((targetElement.children.length == 0) || (targetElement.children[0].children[1].length < 5)) {
            initializeCountdownOutput(counterId, showDaysPart);
        }
        updateCounterOutput(targetElement, countDowns[counterIndex].obj);
        if (countDowns[counterIndex].obj.isFinished()) {
            location.reload();
        }
    }
}

function initializeCountdownOutput(id, showDaysPart) {
    var hoursElem = createCountdownField('hours');
    var minutesElem = createCountdownField('minutes')
    var secondsElem = createCountdownField('seconds');    

    var timeElem = document.getElementById(countDownsPrefix + id);
    if (timeElem) {
        var trElem = document.createElement('tr');        
        if (showDaysPart) {
            var daysElem = createCountdownField('days');
            trElem.appendChild(daysElem);
            trElem.appendChild(createDaysElement());
        }
        trElem.appendChild(hoursElem);
        trElem.appendChild(createColonElement());
        trElem.appendChild(minutesElem);
        trElem.appendChild(createColonElement());
        trElem.appendChild(secondsElem);
        var tableElem = document.createElement('table');
        tableElem.className = 'countdownTable';
        tableElem.appendChild(createCountdownTableHead(showDaysPart));
        tableElem.appendChild(trElem);
        timeElem.appendChild(tableElem);
    }
}

function createCountdownTableHead(showDaysPart) {
    var trElem = document.createElement('tr');
    var thElem = null;
    if (showDaysPart) {
        thElem = document.createElement('th');
        thElem.textContent = 'Tage';
        trElem.appendChild(thElem);
        thElem = document.createElement('th');
        trElem.appendChild(thElem);
    }
    thElem = document.createElement('th');
    thElem.textContent = 'H';
    trElem.appendChild(thElem);
    thElem = document.createElement('th');
    trElem.appendChild(thElem);
    thElem = document.createElement('th');
    thElem.textContent = 'M';
    trElem.appendChild(thElem);
    thElem = document.createElement('th');
    trElem.appendChild(thElem);
    thElem = document.createElement('th');
    thElem.textContent = 'S';
    trElem.appendChild(thElem);
    return trElem;
}

function createColonElement() {
    var colonElement = document.createElement('td');
    colonElement.textContent = ':';
    return colonElement;
}

function createDaysElement() {
    var daysElement = document.createElement('td');
    daysElement.textContent = ' ';
    return daysElement;
}

function updateCounterOutput(targetElement, obj) {    
    if ((targetElement.className.indexOf('showDays') > -1) && (obj.d > 0)) {        
        var d = obj.formatTimeValue(obj.d);    
        var h = obj.formatTimeValue(obj.h);
        var m = obj.formatTimeValue(obj.m);
        var s = obj.formatTimeValue(obj.s);

        updateCounterField(targetElement.children[0].children[1].children[0], d);
        updateCounterField(targetElement.children[0].children[1].children[2], h);
        updateCounterField(targetElement.children[0].children[1].children[4], m);
        updateCounterField(targetElement.children[0].children[1].children[6], s);
    } else {
        var hoursIncludingDays = obj.h + obj.d * 24;

        var h = obj.formatTimeValue(hoursIncludingDays);
        var m = obj.formatTimeValue(obj.m);
        var s = obj.formatTimeValue(obj.s);

        updateCounterField(targetElement.children[0].children[1].children[0], h);
        updateCounterField(targetElement.children[0].children[1].children[2], m);
        updateCounterField(targetElement.children[0].children[1].children[4], s);
    }
}

function updateCounterField(targetElement, timeString) {
    adjustChildrenCount(targetElement, timeString.length);
    for (var i = 0; i < timeString.length; ++i) {
        targetElement.children[i].textContent = timeString[i];
    }
}

function adjustChildrenCount(targetElement, length) {
    var existingElements = targetElement.children.length;
    if (existingElements < length) {
        for (var i = existingElements; i < length; ++i) {
            var newElement = document.createElement('span');
            targetElement.appendChild(newElement);
        }
    }
    else if (existingElements > length) {
        for (var i = existingElements - 1; i > length; ++i) {
            targetElement.children[i].remove();
        }
    }
}

function createCountdownField(fieldName) {
    var field = document.createElement('td');
    field.className = 'timePart ' + fieldName;
    return field;
}

function Countdown(d, h, m, s) {
    this.h = h;
    this.m = m;
    this.s = s;
    this.d = d;
    this.finished = false;
}

Countdown.prototype.decrease = function () {
    if (this.finished) {
        return;
    }
    this.s--;
    if (this.s < 0) {
        this.s = 59;
        this.m--;
        if (this.m < 0) {
            this.m = 59;
            this.h--;
            if (this.h < 0) {
                this.h = 23;
                this.d--;
            }
        }
    }
    if ((this.d == 0) && (this.h == 0) && (this.m == 0) && (this.s == 0)) {
        this.finished = true;
    }
};

Countdown.prototype.formatTimeValue = function (value) {
    var v = String(value);
    if (v.length == 1) {
        v = '0' + v;
    }
    return v;
};

Countdown.prototype.getFormattedValues = function () {
    var d = String(this.d);
    var h = this.formatTimeValue(this.h);
    var m = this.formatTimeValue(this.m);
    var s = this.formatTimeValue(this.s);

    var formattedValues = {
        'd': (d > 0) ? d : null,
        'h': h,
        'm': m,
        's': s
    };

    return formattedValues;
};

Countdown.prototype.getString = function () {
    var formattedValues = this.getFormattedValues();
    var d = formattedValues['d'];
    var h = formattedValues['h'];
    var m = formattedValues['m'];
    var s = formattedValues['s'];

    if (d != null) {
        return d + ' d ' + h + ' h ' + m + ' m ' + s + ' s';
    } else {
        return h + ' h ' + m + ' m ' + s + ' s';
    }
};

Countdown.prototype.isFinished = function () {
    return this.finished;
};
