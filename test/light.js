var renderer, scene, camera, mesh;

init();

function init() {
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('demo')
    })
    renderer.setClearColor(0x000000);
    renderer.shadowMap.enabled = true

    scene = new THREE.Scene();

    perspective()

    addPlane()
    addCube();
    addSphere();

    addAmbient()
    // addPoint()
    addDirectional()

    addSpot();

    renderer.render(scene, camera);
}

function perspective() {
    camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 100)
    camera.position.set(5, 15, 25);
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    scene.add(camera);
}

function addPlane() {
    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(20, 20, 20, 20),
        new THREE.MeshLambertMaterial({
            color: "#ccc",
            side: THREE.DoubleSide
        })
    )

    mesh.receiveShadow = true
    mesh.rotation.x = -Math.PI/ 2;
    mesh.position.y = -1;

    scene.add(mesh)
}

function addCube() {
    var mesh = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2),
        new THREE.MeshPhongMaterial({
            color: "red"
        })
    )

    mesh.castShadow = true
    mesh.rotation.set(0, Math.PI / 4, 0)
    mesh.position.set(-3,1, 0)
    scene.add(mesh)
}

function addSphere() {
    var mesh = new THREE.Mesh(new THREE.SphereGeometry(2, 20, 20),
        new THREE.MeshPhongMaterial({
            color: "red",
            // emissive: "#666",
            shininess: 100
        })
    )

    mesh.castShadow = true;
    mesh.position.set(3, 1, 0)

    scene.add(mesh)
}

function addAmbient() {
    var light = new THREE.AmbientLight("#666")

    scene.add(light)
}

function addPoint() {
    var light = new THREE.PointLight("#fff", 1, 200)
    light.position.set(10, 10, 10)

    scene.add(light)
}

function addDirectional() {
    var light = new THREE.DirectionalLight("#fff", 1)
    light.position.set(10, 10, 10);

    scene.add(light)
}

function addSpot() {
    var light = new THREE.SpotLight("#fff", 1, 100, Math.PI / 6, 25);
    light.position.set(5, 5, 5);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;

    scene.add(light);
}
