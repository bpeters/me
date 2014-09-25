$(document).ready(function() {
  $('#objectives').dataTable({
    "paging": false,
    "bFilter": false,
    "info": false
  });
});

var left_bounce_in_big = new Bounce();
left_bounce_in_big
  .translate({
    from: { x: -400, y: 0 },
    to: { x: 0, y: 0 },
    duration: 1000,
    easing: "bounce",
    bounces: 1
  });

var left_bounce_in_small = new Bounce();
left_bounce_in_small
  .translate({
    from: { x: -60, y: 0 },
    to: { x: 0, y: 0 },
    duration: 1000,
    easing: "bounce",
    bounces: 1
  });

var left_bounce_out_big = new Bounce();
left_bounce_out_big
  .translate({
    from: { x: 0, y: 0 },
    to: { x: -400, y: 0 },
    duration: 1000,
    easing: "bounce",
    bounces: 1
  });

var left_bounce_out_small = new Bounce();
left_bounce_out_small
  .translate({
    from: { x: 0, y: 0 },
    to: { x: -60, y: 0 },
    duration: 1000,
    easing: "bounce",
    bounces: 1
  });

var right_bounce_in_big = new Bounce();
right_bounce_in_big
  .translate({
    from: { x: 400, y: 0 },
    to: { x: 0, y: 0 },
    duration: 1000,
    easing: "bounce",
    bounces: 1
  });

var right_bounce_in_small = new Bounce();
right_bounce_in_small
  .translate({
    from: { x: 60, y: 0 },
    to: { x: 0, y: 0 },
    duration: 1000,
    easing: "bounce",
    bounces: 1
  });

var right_bounce_out_big = new Bounce();
right_bounce_out_big
  .translate({
    from: { x: 0, y: 0 },
    to: { x: 400, y: 0 },
    duration: 1000,
    easing: "bounce",
    bounces: 1
  });

var right_bounce_out_small = new Bounce();
right_bounce_out_small
  .translate({
    from: { x: 0, y: 0 },
    to: { x: 60, y: 0 },
    duration: 1000,
    easing: "bounce",
    bounces: 1
  });

var objective_action_in = new Bounce();
objective_action_in
  .scale({
    from: { x: 0, y: 0 },
    to: { x: 1, y: 1 },
    easing: "bounce",
    duration: 1000,
    stiffness: 1,
    bounces: 5
  });

$( ".user" ).click(function() {
  if ($(".sidebar-left").is(":visible")) {
    left_bounce_out_small.applyTo($(".sidebar-left")).then(function () {
      $( ".sidebar-left" ).hide();
    });
  } else {
    $( ".sidebar-left" ).show();
    left_bounce_in_small.applyTo($(".sidebar-left"));
  }
});

$( ".create-mission-btn" ).click(function() {
  $( ".create-mission" ).show();
  left_bounce_in_big.applyTo($(".create-mission"));
  left_bounce_out_small.applyTo($(".sidebar-left")).then(function () {
    $( ".sidebar-left" ).hide();
  });
});

$( ".cancel-mission-btn" ).click(function() {
  $( ".sidebar-left" ).show();
  left_bounce_in_small.applyTo($(".sidebar-left"));
  left_bounce_out_big.applyTo($(".create-mission")).then(function () {
    $( ".create-mission" ).hide();
  });
});

$( ".globe" ).click(function() {
  if ($(".sidebar-right").is(":visible")) {
    right_bounce_out_small.applyTo($(".sidebar-right")).then(function () {
      $( ".sidebar-right" ).hide();
    });
  } else {
    $( ".sidebar-right" ).show();
    right_bounce_in_small.applyTo($(".sidebar-right"));
  }
});

$( ".create-objective-btn" ).click(function() {
  $( ".create-objective" ).show();
  right_bounce_in_big.applyTo($(".create-objective"));
  right_bounce_out_small.applyTo($(".sidebar-right")).then(function () {
    $( ".sidebar-right" ).hide();
  });
});

$( ".cancel-objective-btn" ).click(function() {
  $( ".sidebar-right" ).show();
  right_bounce_in_small.applyTo($(".sidebar-right"));
  right_bounce_out_big.applyTo($(".create-objective")).then(function () {
    $( ".create-objective" ).hide();
  });
});

$( ".objective" ).hover(function() {
  $( this ).children(".objective-action").show();
  objective_action_in.applyTo($( this ).children(".objective-action"));
}, function() {
  $( this ).children(".objective-action").hide();
});

$( "th" ).click(function() {
  if ($( this ).children("span").hasClass("sort-desc")) {
    $( "th" ).children("span").removeClass("sort-desc");
    $( "th" ).children("span").removeClass("sort-asc");
    $( this ).children("span").addClass("sort-asc");
  } else {
    $( "th" ).children("span").removeClass("sort-desc");
    $( "th" ).children("span").removeClass("sort-asc");
    $( this ).children("span").addClass("sort-desc");
  }

});
