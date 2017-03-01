var renderer, scene, camera, mesh, fpsListener;

var rAF = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function (fn){
        window.setInterval(fn, 1000/ 60)
    }
init();

function init() {
    initFpsListener()

    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('demo')
    })
    renderer.setClearColor(0x000000);

    scene = new THREE.Scene();

    orthographic()

    addCube();

    renderer.render(scene, camera);

    // startAnimate()

    drawRAF()
}

function initFpsListener() {
    fpsListener = new Stats();
    fpsListener.domElement.style.position = "absolute"
    fpsListener.domElement.style.left = "auto"
    fpsListener.domElement.style.right = "0px"
    fpsListener.domElement.style.top = "0px"

    document.body.appendChild(fpsListener.domElement)
}

function orthographic() {
    camera = new THREE.OrthographicCamera(-2, 2, -1.5, 1.5, 1, 20)
    camera.position.set(10, 10, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    scene.add(camera);
}

function addCube() {
    mesh = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial({
            color: 0xff0000,
            wireframe: true
        })
    )
    scene.add(mesh)
}

function draw() {
    mesh.rotation.x = (mesh.rotation.x + 0.01) % (Math.PI * 2)
    mesh.rotation.y = (mesh.rotation.y + 0.01) % (Math.PI * 2);
    mesh.rotation.z = (mesh.rotation.z + 0.01) % (Math.PI * 2);

    renderer.render(scene, camera)
}

function drawRAF() {
    fpsListener.begin();
    mesh.rotation.x = (mesh.rotation.x + 0.01) % (Math.PI * 2)
    mesh.rotation.y = (mesh.rotation.y + 0.01) % (Math.PI * 2);
    mesh.rotation.z = (mesh.rotation.z + 0.01) % (Math.PI * 2);
    renderer.render(scene, camera)
    fpsListener.end()

    rAF(drawRAF);
}

function startAnimate() {
    timer = setInterval(draw, 1000 / 60);
}

function clearAnimate() {
    clearInterval(timer);
}