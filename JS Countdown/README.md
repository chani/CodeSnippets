JS Countdown
============

This is a small JavaScript that will display any number of countdown timers on
a homepage. There are two different variations of this countdown:

  - Display as table with a header
  - Display as inline countdown using only `<span>`

Usage
-----

1. Add the script to your page:

        <script type="text/javascript" src="countdown.js"></script>
     
2. Create the countdown objects with values for days, hours, minutes and seconds:

        <script type="text/javascript">
            var countDownsPrefix = 'countdown_';
            var countDowns = new Array();
            countDowns[0] = { id: 1, obj: new Countdown(5, 6, 7, 8) };
            countDowns[1] = { id: 2, obj: new Countdown(0, 12, 0, 0) };
        </script>
        
3. Add locations for the countdowns to be displayed:

        <div id="countdown_1"></div>
        <table id="countdown_2"></table>
        
    The type of tag you use defines the way it is being displayed. In a `<div>` tag the
    countdown will be shown on one line, while in `<table>` there will be two lines with
    headers for each field.
        
4. Use jQuery or something similar to initialize and start the countdowns:

        jQuery(document).ready(function() {
          updateCountdowns();
        });
        
5. You can change whether the output shows days or adds the days to the hours by adding a
   special CSS class to the `<div>`:
   
        <div id="countdown_1" class="showDays"></div>
        
6. The output is fully customizable by using CSS. Every part of the output has a clearly
   defined CSS class or path.
