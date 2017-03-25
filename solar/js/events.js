define(['app', 'configs'], function(app, configs) {
  var rangeChange = Math.PI / 360,
      mouseLastX, mouseLastY,
      xAxis = THREE.Vector3(1, 0, 0),
      yAxis = THREE.Vector3(0, 1, 0),
      wheelSpeed = 0.1,
      intersect = null;

  //resizing >> resize world
  function onWindowResize() {
      app.windowHalfX = (app.width = window.innerWidth) / 2;
      app.windowHalfY = (app.height = window.innerHeight) / 2;

      app.camera.aspect = app.width / app.height;
      app.camera.updateProjectionMatrix();
      app.renderer.setSize(app.width, app.height);
  }

  //mouse down
  function onMouseRightDown(e) {
      switch (app.view) {
        case configs.view.SYSTEM: {
          app.mouseDown = true;
          break;
        }
        case configs.view.PLANET: {

          break;
        }
      }
  }

  function onMouseDown(e) {
    e.preventDefault();
    switch(e.which) {
      case 1: {

        break;
      }
      case 2: {
        break;
      }
      case 3: {
        onMouseRightDown(e);
        break;
      }
    }
  }

  //mouse click
  function onMouseLeftClick(e) {
    switch (app.view) {
      case configs.view.SYSTEM: {
        if(app.view == configs.view.SYSTEM) {
          app.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
          app.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
          intersect = null;
          var intersects = app.raycaster.intersectObjects( app.intersectsChecking, false);
          if(intersects.length > 0) {
            if(intersects[0].object.name != "PlanetView") {
              $(document).trigger("changeview", [configs.view.PLANET, intersects[0].object]);
            }
          }
        }
        break;
      }
      case configs.view.PLANET: {

        break;
      }
    }
  }

  function onMouseClick(e) {
    switch(e.which) {
      case 1: {
        onMouseLeftClick(e);
        break;
      }
      case 2: {
        break;
      }
      case 3: {
        break;
      }
    }
  }

  //mouse up
  function onMouseRightUp(e) {
    switch (app.view) {
      case configs.view.SYSTEM: {
        app.mouseDown = false;
        break;
      }
      case configs.view.PLANET: {

        break;
      }
    }
  }

  function onMouseUp(e) {
    e.preventDefault();
    switch(e.which) {
      case 1: {

        break;
      }
      case 2: {
        break;
      }
      case 3: {
        onMouseRightUp(e);
        break;
      }
    }
  }

  //mouse out
  function onMouseOut(e) {
    e.preventDefault();
    switch (app.view) {
      case configs.view.SYSTEM: {
        app.mouseDown = false;
        break;
      }
      case configs.view.PLANET: {

        break;
      }
    }
  }

  //mouse move
  function onMouseMove(e) {
    e.preventDefault();
    switch (app.view) {
      case configs.view.SYSTEM: {
      	app.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
      	app.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        if(app.mouseDown) {
          app.camera.position.x -= mouseLastX > e.clientX ? -rangeChange : rangeChange;
          app.camera.position.y += mouseLastY > e.clientY ? -rangeChange : rangeChange;
          mouseLastX = e.clientX;
          mouseLastY = e.clientY;
          app.camera.lookAt(app._focusObject.position);
          //updateCameraRange
          app.updateCameraRange();
        }
        break;
      }
      case configs.view.PLANET: {

        break;
      }
    }
  }

  //mouse wheel
  function onMouseWheel(e) {
    switch (app.view) {
      case configs.view.SYSTEM: {
        let newRange = app.currentCameraRange += e.deltaY > 0 ? wheelSpeed : -wheelSpeed;
        app.currentCameraRange = newRange > app.cameraMaxRange ? app.cameraMaxRange : newRange < app.cameraMinRange ? app.cameraMinRange : newRange;
        //updateCameraRange
        app.updateCameraRange();
        break;
      }
      case configs.view.PLANET: {

        break;
      }
    }
  }
  var i = 0;
  var btnPlanets = $('.btn_planet_container');
  $('body').on('click', '.btn_planet', e => {
    if(e.target.id && app.planets[e.target.id]) {
      $(document).trigger('changeview', [configs.view.PLANET, app.planets[e.target.id]]);
    }
  })
  // change view
  // BE3HW - step 05
  // object truyen vao day la 1 hanh tinh
  function onChangeView(e, viewType, object = {}) {
    if(app.view != viewType) {
      switch (viewType) {
        case configs.view.SYSTEM: {
          app.setFocus(object);
          app.menu.left1.html('');
          $('.right').append(btnPlanets);
          app.menu.right1.html('');
          app.view = viewType;
          break;
        }
        case configs.view.PLANET: {
          // BE3HW - step 05.01
          // an vao planet >> gui request ajax ve server theo url '/api/solar' + query
          // co response ajax tra ve >> dien thong tin tuong ung nhan duoc len
          app.planetView.onFocus(object);
          $('body').find('.btn_planet_container').remove();
          app.setFocus(app.planetView);
          app.view = viewType;
          $.ajax({
            url: '/api/solar?planet=' + object.name // object.name = 'Sun' || 'Earth' ...
          }).done(function(res = {}) {
            app.menu.left1.html((res.name || '') + " - " + (res.radiant || ''));
            app.menu.right1.html((res.description || ''));
          }).fail(function(res) {
            app.menu.left1.html('');
            app.menu.right1.html('');
          })

          return;
        }
      }
    }
  }

  $(window).on('resize', onWindowResize);
  $(document).on('contextmenu', function() { return false; }); //disable default event/ preventDefault not working so use it
  $(document).on('click', onMouseClick);
  $(document).on('mousedown', onMouseDown);
  $(document).on('mouseup', onMouseUp);
  $(document).on('mouseout', onMouseOut);
  $(document).on('mousemove', onMouseMove);
  $(document).on('changeview', onChangeView);
  window.addEventListener('wheel', onMouseWheel, false);

  $(document).ready(function() {
    app.update(0);
    app.menu = {
      ssv: $("#solarSystemView"),
      left: $(".menu>.left"),
      left1: $("#left1"),
      right: $(".menu>.right"),
      right1: $("#right1")
    };
    app.menu.ssv.on('click', function(e) {
      e.preventDefault();
      onChangeView({}, configs.view.SYSTEM, app.scene);
    });
  });
})
