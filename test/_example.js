var renderer, scene, camera, mesh;

init();

function init() {
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('demo')
    })
    renderer.setClearColor(0x000000);

    scene = new THREE.Scene();

    perspective()

    addCube();

    renderer.render(scene, camera);
}

function perspective() {
    camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 20)
    camera.position.set(10, 10, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    scene.add(camera);
}

function addCube() {
    mesh = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial({
            wireframe: true
        })
    )
    scene.add(mesh)
}

