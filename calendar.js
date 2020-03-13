
const calendarWidth = 600;
const itemColor = '#606EA2'; 
const eventBgColor = '#FFFFFF';
const locColor = '#B1B3B2';
const maxEventWidth = calendarWidth - calendarWidth / 100 
var marginsAndOverlaps = []
var timestamps = document.createElement('div');
Number.prototype.isBetween = function(a, b){return (this >= a && this <= b);}
var eventsOnCalendar = []

function layOutDay(events) 
{    
    for (let i = 0; i < events.length; i++)
    {
        checkOverlaps(events, events[i])
        createEvent(events[i].start, events[i].end, events[i].overlaps);
    }

}
function setMargin (events, event)
{
    //set event margin to calenderWidth / numOverlaps
    event.overlaps
}

function checkOverlaps(events, eventDict)
{    
    start = eventDict.start
    end = eventDict.end
    overlappingStarts = 0;
    overlappingEnds = 0;
    var eventsToCheck = events;
    for (let i = 0; i < eventsToCheck.length; i++)
    {
        eventStart = eventsToCheck[i].start;
        eventEnd = eventsToCheck[i].end;
        if ((start.isBetween(eventStart, eventEnd)))
        {
            overlappingStarts ++  
        }
        if (end.isBetween(eventStart, eventEnd))
        {
            overlappingEnds ++;
        }
    }
    // add the number of times the event overlaps to the dict describing its start and end
    eventDict['overlaps'] = Math.max(overlappingStarts, overlappingEnds); 
}
function setMargin(event, numOverlaps)
{
    
    if (numOverlaps == 1)
    {
        event.style.marginLeft = 0;
    }

}
function createEvent (start, end, overlapCount)
{
    width = maxEventWidth/overlapCount;
    container = document.querySelector('.cal-container');
    container.style.zIndex = '-1';
    event = document.createElement('div');
    event.classList.add('Eventat' + start);
    setEventStyle(event, start, end, width + 'px', overlapCount);
    createItem(event, start);
    createLocation(event);
    container.appendChild(event);
}

/* --------------styling functions-------------- */
function setEventStyle (event, start, end, width, overlapCount)
{
    event.style.position = 'absolute';
    event.style.top = start+'px';//sets y position
    event.style.width = width;//second term accounts for left border
    event.style.height = Math.abs(end - start) + 'px';
    event.style.backgroundColor = eventBgColor; 
    event.style.zIndex = 1;
    event.style.borderLeft = `${calendarWidth / 100}px solid ${itemColor}`;
    
}
function createItem(event, start)
{
    item = document.createElement('h2');
    item.textContent += 'Sample Item';
    item.style.fontWeight = '650';
    setTextStyle(item, '16px', itemColor, start);
    event.appendChild(item);
}
function createLocation(event)
{
    loc = document.createElement("p");
    locText = document.createTextNode("Sample Location");
    loc.appendChild(locText);
    setTextStyle(loc, '10px', locColor);
    event.appendChild(loc);
}
function setTextStyle (item, fontSize, color)
{
    item.style.color = color;
    item.style.fontSize = fontSize;
    item.style.zIndex = '2';
    item.style.paddingTop = (calendarWidth / 50) + 'px';
    item.style.paddingLeft = (calendarWidth / 100) + 'px';
    item.style.lineHeight = '0px';
}
layOutDay([
    {start: 30, end: 150}, 
    {start: 540, end: 600}, 
    {start: 560, end: 620},
    {start: 610, end: 670} 
])

