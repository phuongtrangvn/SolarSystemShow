require.config({
  paths: {
    entities: "js/entities",
    configs: "js/configs",
    app: "js/app",
    events: "js/events"
  }
});

require(['app', 'events', 'configs',
    'entities/sun',
    'entities/mercury',
    'entities/venus',
    'entities/earth',
    'entities/mars',
    'entities/jupiter',
    'entities/saturn',
    'entities/uranus',
    'entities/neptune']
    , function(app, events, configs, sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune) {
  app.scene.add(sun);
  app.updateQueue.push(sun.update);
  app.intersectsChecking.push(sun);

  app.scene.add(mercury);
  app.updateQueue.push(mercury.update);
  app.intersectsChecking.push(mercury);

  app.scene.add(venus);
  app.updateQueue.push(venus.update);
  app.intersectsChecking.push(venus);

  app.scene.add(earth);
  app.updateQueue.push(earth.update);
  app.intersectsChecking.push(earth);

  app.scene.add(mars);
  app.updateQueue.push(mars.update);
  app.intersectsChecking.push(mars);

  app.scene.add(jupiter);
  app.updateQueue.push(jupiter.update);
  app.intersectsChecking.push(jupiter);

  app.scene.add(saturn);
  app.updateQueue.push(saturn.update);
  app.intersectsChecking.push(saturn);

  app.scene.add(uranus);
  app.updateQueue.push(uranus.update);
  app.intersectsChecking.push(uranus);

  app.scene.add(neptune);
  app.updateQueue.push(neptune.update);
  app.intersectsChecking.push(neptune);

  app.planets = {
    Sun: sun,
    Mercury: mercury,
    Venus: venus,
    Earth: earth,
    Mars: mars,
    Jupiter: jupiter,
    Saturn: saturn,
    Uranus: uranus,
    Neptune: neptune
  };
  app.setFocus(sun);
})
