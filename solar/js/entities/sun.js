define(['configs', 'app'], function(configs, app) {
  var config = configs.sun;

  var geometry,
      material,
      sunMesh;

  var lights;

  geometry = new THREE.SphereGeometry(config.radiant, 32, 32);
  material = new THREE.MeshPhongMaterial();

  material.map = THREE.ImageUtils.loadTexture('img/sunmap.jpg');
	material.bumpMap = THREE.ImageUtils.loadTexture('img/sunmap.jpg');
	material.bumpScale = 0.05;

  sunMesh = new THREE.Mesh(geometry, material);

  light = new THREE.PointLight(0xffffff, 2, 20, 0.069);
  sunMesh.add(light);
  light.receiveShadow = true;

  // config.spotLight.positions.forEach(function(position) {
  //   var spotLight = new THREE.SpotLight(config.spotLight.color, config.spotLight.intensity,
  //     config.spotLight.distance, config.spotLight.angle);
  //   spotLight.target.position.set(0, 0, 0);
  //   spotLight.position.set(position.x, position.y, position.z);
  //   sunMesh.add(spotLight);
  // })


  // var spotLight = new THREE.SpotLight(config.spotLight.color, config.spotLight.intensity,
  //   config.spotLight.distance, config.spotLight.angle);
  // spotLight.target.position.set(0, 0, 0);
  // spotLight.position.set(position.x, position.y, position.z);
  // sunMesh.add(spotLight);

  var fire = createFire(config, app, sunMesh);

  sunMesh.update = function() {
    sunMesh.rotation.y += 0.01;
    fire.update();
  }
  // console.log(app.domEvents.addEventListener);
  // sunMesh.addEventListener("click", function(e) {
  //   console.log("sun click");
  // })

  sunMesh.name = "Sun";

  return sunMesh;
})

function createFire(config, app, sun) {
  var fire,
      fireGeometry,
      fireMaterial;
  fireGeometry = new THREE.CircleGeometry(2 * config.radiant, 60);
  fireMaterial = new THREE.MeshBasicMaterial({
    color: "#FF0000",
    map: THREE.ImageUtils.loadTexture("img/pe/smokeparticle.png"),
    blending: THREE.AdditiveBlending,
    transparent: true
  })
  fire = new THREE.Mesh(fireGeometry, fireMaterial);
  app.scene.add(fire);
  fire.update = function() {
    this.position.copy(app.camera.position);
    this.position.setLength(config.radiant * 1.5);
    fire.lookAt(app.camera.position);
  }
  app.scene.add(fire);
  return fire;
}
//
// function createFires(config, sun) {
//   var sunRadiant = config.radiant,
//       minRange = sunRadiant,
//       maxRange = config.radiant + 0.002,
//       velocityLength = 30;
//
//       particleCount = 3000,
//       particles = new THREE.Geometry(),
//       pMaterial = new THREE.ParticleBasicMaterial({
//         color: "#FF0000",
//         size: 0.002,
//         map: THREE.ImageUtils.loadTexture("img/pe/smokeparticle.png"),
//         blending: THREE.AdditiveBlending,
//         transparent: true
//       });
//
//   // now create the individual particles
//   for (let p = 0; p < particleCount; p++) {
//
//     // create a particle with random
//     // position values, -250 -> 250
//     var pX = Math.random() - 0.5,
//         pY = Math.random() - 0.5,
//         pZ = Math.random() - 0.5,
//         particle = new THREE.Vector3(pX, pY, pZ);
//     particle.setLength(sunRadiant + Math.random() * 0.002);
//     particle.clampLength(minRange, maxRange);
//     // add it to the geometry
//     particles.vertices.push(particle);
//   }
//
//   // create the particle system
//   var particleSystem = new THREE.ParticleSystem(
//       particles,
//       pMaterial);
//
//   //create velocitys
//   particleSystem.velocitys = [];
//   particleSystem.currentVelo = 0;
//
//   for(let i = 0; i < velocityLength; i++) {
//     var vx = Math.random() * 0.002 - 0.001,
//         vy = Math.random() * 0.002 - 0.001,
//         vz = Math.random() * 0.002 - 0.001;
//     particleSystem.velocitys.push(new THREE.Vector3(vx, vy, vz));
//   }
//
//   // add it to the scene
//   particleSystem.update = function() {
//     particles.vertices.forEach(v => v.add(particleSystem.velocitys[particleSystem.currentVelo += particleSystem.currentVelo < velocityLength - 1 ? 1 : -particleSystem.currentVelo]));
//   }
//   sun.add(particleSystem);
//   return particleSystem;
// }
