define([], function() {
  class TrajectoryMesh extends THREE.Line {
    constructor(configs, planet) {
      var curve = new THREE.EllipseCurve(
      	configs.aX,  configs.aY,            // ax, aY
      	configs.xRadius, configs.yRadius,           // xRadius, yRadius
      	0,  2 * Math.PI,  // aStartAngle, aEndAngle
      	false,            // aClockwise
      	0                 // aRotation
      );

      var path = new THREE.Path( curve.getPoints( configs.points ) );
      var geometry = path.createPointsGeometry( configs.points );
      var material = new THREE.LineBasicMaterial( { color : 0xffffff } );

      super( geometry, material );
      this.templateVector1 = new THREE.Vector3();
      this.templateVector2 = new THREE.Vector3();
      this.currentVerticesIndex = configs.startPosition || 0;
      this.planet = planet;
      this.halfPI = Math.PI / 2;
      this.rotation.x += this.halfPI;
      this.nextPosition();
    }

    setPlanetPosition(time) {
      if(this.planet) {
        let currentVt = this.templateVector1.copy(this.geometry.vertices[this.currentVerticesIndex]).applyAxisAngle(new THREE.Vector3(1, 0, 0), -this.halfPI);
        let nextVt = this.templateVector2.copy(this.geometry.vertices[this.getNextVerticesIndex()]).applyAxisAngle(new THREE.Vector3(1, 0, 0), -this.halfPI);
        let currentPosition = this.planet.position;
        // this.templateVector1.set(this.planet.position.x, this.planet.position.y, this.planet.position.z);
      }
    }

    nextPosition() {
      var nextVt = this.geometry.vertices[this.currentVerticesIndex = this.getNextVerticesIndex()];
      this.planet.position.copy(nextVt).applyAxisAngle(new THREE.Vector3(1, 0, 0), -this.halfPI);
      return nextVt;
    }

    getNextVerticesIndex() {
      return this.currentVerticesIndex < this.geometry.vertices.length - 2 ? this.currentVerticesIndex + 1 : 0;
    }
  }

  return TrajectoryMesh;
})
