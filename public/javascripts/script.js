var bounce_in_big = new Bounce();
bounce_in_big
  .translate({
    from: { x: -400, y: 0 },
    to: { x: 0, y: 0 },
    duration: 1000,
    easing: "bounce",
    bounces: 1
  });

var bounce_in_small = new Bounce();
bounce_in_small
  .translate({
    from: { x: -60, y: 0 },
    to: { x: 0, y: 0 },
    duration: 1000,
    easing: "bounce",
    bounces: 1
  });

var bounce_out_big = new Bounce();
bounce_out_big
  .translate({
    from: { x: 0, y: 0 },
    to: { x: -400, y: 0 },
    duration: 1000,
    easing: "bounce",
    bounces: 1
  });

var bounce_out_small = new Bounce();
bounce_out_small
  .translate({
    from: { x: 0, y: 0 },
    to: { x: -60, y: 0 },
    duration: 1000,
    easing: "bounce",
    bounces: 1
  });

$( ".menu" ).click(function() {
  $( ".sidebar" ).show();
  bounce_in_small.applyTo($(".sidebar")).then(function () {

  });
});

$( ".add" ).click(function() {
  $( ".sidebar-add" ).show();
  bounce_in_big.applyTo($(".sidebar-add")).then(function () {
  });
  bounce_out_small.applyTo($(".sidebar")).then(function () {
    $( ".sidebar" ).hide();
  });
});

$( ".cancel-add" ).click(function() {
  $( ".sidebar" ).show();
  bounce_in_small.applyTo($(".sidebar")).then(function () {
  });
  bounce_out_big.applyTo($(".sidebar-add")).then(function () {
    $( ".sidebar-add" ).hide();
  });
});
