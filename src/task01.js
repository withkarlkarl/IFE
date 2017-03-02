/**
 * Created by SunJ on 2017/2/27.
 */
var renderer, scene, camera, car, light;

init();

function init() {
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('demo')
    })
    renderer.setClearColor("#666666");

    scene = new THREE.Scene();

    perspective()

    packageCar();

    renderer.render(scene, camera);
}

function perspective() {
    camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 100)
    camera.position.set(-40, 40, 40);
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    scene.add(camera);
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
        new THREE.MeshNormalMaterial({
        })
    )

    scene.add(mesh);

    return mesh;
}

function addCarBody() {
    var mesh = new THREE.Mesh(new THREE.CubeGeometry(2, 3, 5),
        new THREE.MeshNormalMaterial({
        })
    )
    mesh.scale.set(5, 5, 5)

    scene.add(mesh)

    return mesh;
}

function addCarWheel() {
    var mesh = new THREE.Mesh(new THREE.TorusGeometry(1.5, 1, 20, 20),
        new THREE.MeshNormalMaterial({
        })
    )
    mesh.rotation.set(0, Math.PI / 2, 0)

    scene.add(mesh)

    return mesh;
}




