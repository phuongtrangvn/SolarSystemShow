define(['configs'], function(configs) {
  var config = configs.planetView;

  var geometry,
      material,
      mesh;

  var lights;

  geometry = new THREE.SphereGeometry(config.radiant, 32, 32);
  material = new THREE.MeshPhongMaterial();

	material.map = THREE.ImageUtils.loadTexture('img/sunmap.jpg');
	material.bumpMap = THREE.ImageUtils.loadTexture('img/sunmap.jpg');
	material.bumpScale = 0.5;

  mesh = new THREE.Mesh(geometry, material);
  mesh.configs = config;
  //this planet's update write on app.js file

  mesh.name = "PlanetView";

  var cloudGeometry,
    cloudMaterial,
    cloudMesh;

  cloudGeometry = new THREE.SphereGeometry(config.radiant * 1.01, 32, 32);
  cloudMaterial = new THREE.MeshPhongMaterial({
    map         : THREE.ImageUtils.loadTexture('img/earthcloudmaptrans.jpg'),
    bumpMap     : THREE.ImageUtils.loadTexture('img/earthcloudmap.jpg'),
    bumpScale   : 0.05,
    side        : THREE.DoubleSide,
    opacity     : 0.1,
    transparent : true,
    depthWrite  : false
  });

  cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
  mesh.add(cloudMesh);

  mesh.onFocus = function(target) {
    mesh.material.map = target.material.map;
    mesh.material.bumpMap = target.material.bumpMap;
    mesh.material.bumpScale = target.material.bumpScale * 10;
    if(target.name.toLowerCase() == 'earth') {
      cloudMesh.opacity = 1;
    } else {
      cloudMesh.opacity = 0;
    }
  }

  return mesh;
})
