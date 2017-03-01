var requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

var scene = null;
var camera = null;
var renderer = null;

var id = null;

var stat = null;

var ballMesh = null;
var ballRadius = 0.5;
var isMoving = false;
var maxHeight = 5;

var v = 0;
var a = -0.01;

init();
function init() {
    stat = new Stats();
    stat.domElement.style.position = 'absolute';
    stat.domElement.style.left = "auto";
    stat.domElement.style.right = '0px';
    stat.domElement.style.top = '0px';
    document.body.appendChild(stat.domElement);

    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('demo')
    });
    renderer.setClearColor(0x000000)

    scene = new THREE.Scene();

    camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
    camera.position.set(5, 5, 20);
    camera.lookAt(new THREE.Vector3(0, 3, 0));
    scene.add(camera);

    // ball
    ballMesh = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 16, 8),
        new THREE.MeshLambertMaterial({
            color: 0xffff00
        }));
    ballMesh.position.y = ballRadius;
    scene.add(ballMesh);

    // plane
    var textureLoader = new THREE.TextureLoader();

    textureLoader.load("../src/img/01YdRC86nAUx.png", function (texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4);

        var plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5),
            new THREE.MeshLambertMaterial({map: texture})
        );

        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);

        renderer.render(scene, camera);
    })

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 15);
    scene.add(light);

    renderer.render(scene, camera);

    drop()

    id = requestAnimationFrame(draw);


}

function draw() {
    if (isMoving) {
        stat.begin();
        console.log("draw")

        ballMesh.position.y += v;
        v += a;

        if (ballMesh.position.y <= ballRadius) {
            // hit plane
            v = -v * 0.9;

            if (Math.abs(v) < 0.05) {
                // stop moving
                isMoving = false;
                ballMesh.position.y = ballRadius;
                renderer.render(scene, camera);
                stop()
            }
        }

        renderer.render(scene, camera);
        stat.end();

        id = requestAnimationFrame(draw);
    }
}

function stop() {
    if (id !== null) {
        cancelAnimationFrame(id);
        id = null;
    }
}

function drop() {
    isMoving = true;
    ballMesh.position.y = maxHeight;
    v = 0;
}