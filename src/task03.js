/**
 * Created by SunJ on 2017/2/27.
 */
var renderer, scene, camera, floor, car, light;

init();

function init() {
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('demo')
    })
    renderer.setClearColor("#666666");
    renderer.shadowMap.enabled = true

    scene = new THREE.Scene();

    perspective()

    addPlane()
    packageCar();

    addStreetLamp()

    addAmbient()
    addSpot();

    renderer.render(scene, camera);
}

function perspective() {
    camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 1000)
    camera.position.set(-60, 50, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    scene.add(camera);
}

function addPlane() {
    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100),
        new THREE.MeshPhongMaterial({
            color: "#a1b578"
        })
    )

    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -10
    mesh.receiveShadow = true
    scene.add(mesh)

    floor = mesh;
}

function packageCar() {
    var body = addCarBody()
    var head = addCarHead();

    var wheel1 = addCarWheel();
    var wheel2 = addCarWheel();
    var wheel3 = addCarWheel();
    var wheel4 = addCarWheel();

    head.position.set(0, -4, -13)
    wheel1.position.set(-5, -7.5, 6)
    wheel2.position.set(-5, -7.5, -6)
    wheel3.position.set(5, -7.5, 6)
    wheel4.position.set(5, -7.5, -6)

    car = new THREE.Object3D(0, 0, 0);
    car.add(head, body, wheel1, wheel2, wheel3, wheel4)
    scene.add(car)
}

function addCarHead() {
    var mesh = new THREE.Mesh(new THREE.CubeGeometry(8, 8, 8),
        new THREE.MeshPhongMaterial({
            color: "#c9c9c9"
        })
    )

    scene.add(mesh);

    return mesh;
}

function addCarBody() {
    var mesh = new THREE.Mesh(new THREE.CubeGeometry(2, 3, 5),
        new THREE.MeshPhongMaterial({
            color: "#c9c9c9"
        })
    )
    mesh.castShadow = true
    mesh.scale.set(5, 5, 5)

    scene.add(mesh)

    return mesh;
}

function addCarWheel() {
    var mesh = new THREE.Mesh(new THREE.TorusGeometry(1.5, 1, 20, 20),
        new THREE.MeshPhongMaterial({
            color: "#c9c9c9"
        })
    )
    mesh.castShadow = true
    mesh.rotation.set(0, Math.PI / 2, 0)

    scene.add(mesh)

    return mesh;
}

function addAmbient() {
    var light = new THREE.AmbientLight("#666")

    scene.add(light)
}

function addSpot() {
    var light = new THREE.SpotLight("#fff", 1, 100, Math.PI / 6, 25);
    light.position.set(-15, 25, 35);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;

    scene.add(light);
}

function addPoint() {
    var light = new THREE.PointLight("#fff", .9);
    scene.add(light)

    return light
}

function addStreetLamp() {
    var head = new THREE.Mesh(new THREE.SphereGeometry(1.2, 100, 100),
        new THREE.MeshPhongMaterial({
            color: "#c9c9c9",
            emissive: "#999"

        })
    )
    
    var body = new THREE.Mesh(new THREE.CylinderGeometry(.3, .3, 25, 20, 20),
        new THREE.MeshPhongMaterial({
            color: "#fff"
        })
    )

    head.position.set(-15, 13, 15);
    body.position.set(-15, 0, 15);

    var pointLight = addPoint();
    pointLight.position.set(-15, 10, 15);

    scene.add(head);
    scene.add(body)
}

function setCubeImgMaterial(imgs, o) {
    var loader = new THREE.TextureLoader();

    var materials = [];
    imgs.forEach(function (img) {
        loader.load(img, function (texture) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;

            texture.repeat.set(4, 4)
            var material = new THREE.MeshBasicMaterial({
                map: texture
            })
            materials.push(material);

            if(materials.length === 6) {
                // var cube = faceCube(materials)
                o.material = materials;

                renderer.render(scene, camera);
            }
        })
    })
}


function setImgMaterial(img , o) {
    var loader = new THREE.TextureLoader();

    loader.load(img , function (texture) {

        var material = new THREE.MeshBasicMaterial({
            map: texture
        })

        o.material = material
        renderer.render(scene, camera)
    })
}

