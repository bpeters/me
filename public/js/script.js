var left_bounce_in_big = new Bounce();
left_bounce_in_big
  .translate({
    from: { x: -400, y: 0 },
    to: { x: 0, y: 0 },
    duration: 1000,
    easing: "bounce",
    bounces: 1
  });
