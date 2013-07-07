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
            removeCountdownOutput(targetElement);
        }
        
        var showDaysPart = (targetElement.className.indexOf('showDays') > -1) && (countDowns[counterIndex].obj.d > 0);  
        if (!isCountdownInitialized(counterId)) {
            initializeCountdownOutput(counterId, showDaysPart);
        }
        updateCounterOutput(targetElement, countDowns[counterIndex].obj);
        if (countDowns[counterIndex].obj.isFinished()) {
            location.reload();
        }
    }
}

function removeCountdownOutput(targetElement) {
    for (var i = targetElement.children.length - 1; i >= 0; --i) {
        targetElement.children[i].remove();
    }
}

function isCountdownInitialized(id) {
    var targetElement = document.getElementById(countDownsPrefix + id);
    if (targetElement.nodeName.toLowerCase() == 'div') {
        return (targetElement.children.length >= 5);
    }
    else if (targetElement.nodeName.toLowerCase() == 'table') {
        return ((targetElement.children.length > 1) && (targetElement.children[1].children.length >= 5));
    }
    else {
        return false;
    }
}

function initializeCountdownOutput(id, showDaysPart) {    
    var timeElem = document.getElementById(countDownsPrefix + id);
    if (timeElem && (timeElem.nodeName.toLowerCase() == 'div')) {
        initializeDivCountdownOutput(timeElem, showDaysPart);
    }
    else if (timeElem && (timeElem.nodeName.toLowerCase() == 'table')) {
        initializeTableCountdownOutput(timeElem, showDaysPart);
    }
}

function initializeDivCountdownOutput(timeElem, showDaysPart) {
    var hoursElem = createCountdownField('hours', false);
    var minutesElem = createCountdownField('minutes', false)
    var secondsElem = createCountdownField('seconds', false);
    
    if (showDaysPart) {
        var daysElem = createCountdownField('days', false);
        timeElem.appendChild(daysElem);
        timeElem.appendChild(createDaysElement(false));
    }
    timeElem.appendChild(hoursElem);
    timeElem.appendChild(createColonElement(false));
    timeElem.appendChild(minutesElem);
    timeElem.appendChild(createColonElement(false));
    timeElem.appendChild(secondsElem);
}

function initializeTableCountdownOutput(timeElem, showDaysPart) {
    var hoursElem = createCountdownField('hours', true);
    var minutesElem = createCountdownField('minutes', true)
    var secondsElem = createCountdownField('seconds', true);
    
    var trElem = document.createElement('tr');        
    if (showDaysPart) {
        var daysElem = createCountdownField('days', true);
        trElem.appendChild(daysElem);
        trElem.appendChild(createDaysElement(true));
    }
    trElem.appendChild(hoursElem);
    trElem.appendChild(createColonElement(true));
    trElem.appendChild(minutesElem);
    trElem.appendChild(createColonElement(true));
    trElem.appendChild(secondsElem);
    timeElem.appendChild(createCountdownTableHead(showDaysPart));
    timeElem.appendChild(trElem);
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

function createColonElement(isTableField) {
    var colonElement = (isTableField) ? document.createElement('td') : document.createElement('span');
    colonElement.textContent = ':';
    colonElement.className = 'colonElement';
    return colonElement;
}

function createDaysElement(isTableField) {
    var daysElement = (isTableField) ? document.createElement('td') : document.createElement('span');
    daysElement.textContent = (isTableField) ? ' ' : ' Tage ';
    daysElement.className = 'daysElement';
    return daysElement;
}

function updateCounterOutput(targetElement, obj) {    
    var showDaysPart = (targetElement.className.indexOf('showDays') > -1) && (obj.d > 0);
    if (showDaysPart) {
        var d = obj.formatTimeValue(obj.d);
        var h = obj.formatTimeValue(obj.h);
        var m = obj.formatTimeValue(obj.m);
        var s = obj.formatTimeValue(obj.s);

        if (isDivCountdownView(targetElement)) {
            updateCounterField(targetElement.children[0], d);
            updateCounterField(targetElement.children[2], h);
            updateCounterField(targetElement.children[4], m);
            updateCounterField(targetElement.children[6], s);
        }
        else if (isTableCountdownView(targetElement)) {
            updateCounterField(targetElement.children[1].children[0], d);
            updateCounterField(targetElement.children[1].children[2], h);
            updateCounterField(targetElement.children[1].children[4], m);
            updateCounterField(targetElement.children[1].children[6], s);
        }
    } else {
        var hoursIncludingDays = obj.h + obj.d * 24;

        var h = obj.formatTimeValue(hoursIncludingDays);
        var m = obj.formatTimeValue(obj.m);
        var s = obj.formatTimeValue(obj.s);

        if (isDivCountdownView(targetElement)) {
            updateCounterField(targetElement.children[0], h);
            updateCounterField(targetElement.children[2], m);
            updateCounterField(targetElement.children[4], s);
        }
        else if (isTableCountdownView(targetElement)) {
            updateCounterField(targetElement.children[1].children[0], h);
            updateCounterField(targetElement.children[1].children[2], m);
            updateCounterField(targetElement.children[1].children[4], s);
        }
    }
}

function isTableCountdownView(targetElement) {
    return targetElement.nodeName.toLowerCase() == 'table';
}

function isDivCountdownView(targetElement) {
    return targetElement.nodeName.toLowerCase() == 'div';
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

function createCountdownField(fieldName, isTableField) {
    var field = (isTableField) ? document.createElement('td') : document.createElement('span');
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
