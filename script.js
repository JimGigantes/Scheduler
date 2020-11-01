$(document).ready(function() {
  
  var now = moment().format('MMMM Do YYYY');
  var nowHour24 = moment().format('H');
  var today = $('#today');
  var savedPlanner = JSON.parse(localStorage.getItem("savedPlanner"));

  today.text(now);
  
  //declare the array
   if (savedPlanner !== null) {
    planTextArr = savedPlanner;
  } else {
    planTextArr = new Array(24);
  }
  
   // reference the planner area
  var planner = $('.container');
  planner.empty();

 // This fore loop will create everything (hours midnight-midnight)
  
  for (var hour = 0; hour <= 24; hour++) {
  var index = hour ;

    var row = $('<div>');
    row.addClass('row');
    row.attr('hour-index',hour);
    
    var timeDiv = $('<div>');
    timeDiv.addClass('col-md-2 timeBox hour time-block');
  
    // create timeBox span (contains time)
    var hourBox = $('<span>');
    hourBox.attr('class','time-block');
    
    // format hours for display
    var displayHour = 0;
    var ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }
    
    // populate timeBox with time
    hourBox.text(`${displayHour}:00 ${ampm}`);

    // insert into col inset into timebox
    row.append(timeDiv);
    timeDiv.append(hourBox);
    // STOP building Time box portion of row

    // START building input portion of row along with adding some of the css
    var dailyPlanInput = $('<input>');

    dailyPlanInput.attr('id',`input-${index}`);
    dailyPlanInput.attr('hour-index',index);
    dailyPlanInput.attr('type','text');
    dailyPlanInput.attr('class','dailyPlan textarea');

    // access index from data array for hour 
    dailyPlanInput.val( planTextArr[index] );
    
    // create col to control width
    var textcolumn = $('<div>');
    textcolumn.addClass('col-md-9');

    // add col width and row component to row
    row.append(textcolumn);
    textcolumn.append(dailyPlanInput);
    

    // Here I build the save portion of the row
    var saveDiv = $('<div>');
    saveDiv.addClass('col-md-1 saveBtn');

    var saveButton = $('<i>');
    saveButton.attr('id',`saveid-${index}`);
    saveButton.attr('save-id',index);
    saveButton.attr('class',"far fa-save ");
    
    // add col width and row component to row
    row.append(saveDiv);
    saveDiv.append(saveButton);
    // STOP building save portion of row

    // set row color based on time
    updateRowColor(row, hour, textcolumn);
    
    // add row to planner container
    planner.append(row);
  };

  //update row color
  function updateRowColor (Row,hour, textcolumn) { 
    if ( hour < nowHour24) {
        textcolumn.addClass('past')
    } else if ( hour > nowHour24) {
        textcolumn.addClass('future')
    } else {
        textcolumn.addClass('present')
    }
  };

  // onclick function which listens to the save button in order to save to local storage
  $(document).on('click','i', function(event) {
    event.preventDefault();  

    var indexTwo = $(this).attr('save-id');
    var inputId = '#input-' + indexTwo;
    var val = $(inputId).val();
    planTextArr[indexTwo] = val;

    localStorage.setItem("savedPlanner", JSON.stringify(planTextArr));
  });  
});