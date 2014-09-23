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

$( ".add-mission-btn" ).click(function() {
  $( ".add-mission" ).show();
  left_bounce_in_big.applyTo($(".add-mission"));
  left_bounce_out_small.applyTo($(".sidebar-left")).then(function () {
    $( ".sidebar-left" ).hide();
  });
});

$( ".cancel-mission-btn" ).click(function() {
  $( ".sidebar-left" ).show();
  left_bounce_in_small.applyTo($(".sidebar-left"));
  left_bounce_out_big.applyTo($(".add-mission")).then(function () {
    $( ".add-mission" ).hide();
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
