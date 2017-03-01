var renderer, scene, camera;

init();

function init() {
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('demo')
    })
    renderer.setClearColor(0x000000);

    scene = new THREE.Scene();

    orthographic();

    addCube();

    renderer.render(scene, camera);
}

function orthographic() {
    camera = new THREE.OrthographicCamera(-2, 2, -1.5, 1.5, 1, 20)
    camera.position.set(10, 10, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    scene.add(camera);
}

function perspective() {
    camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 20)
    camera.position.set(10, 10, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    scene.add(camera);
}

function addCube() {
    var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })
    )
    scene.add(cube)
}
