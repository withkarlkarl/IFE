var renderer, scene, camera, material;

init();

function init() {
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('demo')
    })
    renderer.setClearColor(0x000000);

    scene = new THREE.Scene();

    perspective()

    material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    })

    addSphere();

    renderer.render(scene, camera);
}

function perspective() {
    camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 20)
    camera.position.set(10, 10, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    scene.add(camera);
}

function addCube() {
    var cube = new THREE.Mesh(new THREE.CubeGeometry(3, 3, 3), material)

    scene.add(cube)
}

function addPlane() {
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)

    scene.add(plane)
}

function addSphere() {
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 20, 20), material)

    scene.add(sphere)
}

function addText() {
    var loader = new THREE.FontLoader();

    loader.load('../lib/fonts/helvetiker_regular.typeface.json', function (font) {
        var text = new THREE.Mesh(new THREE.TextGeometry('HelloWorld', {
            font: font,
            size: 1,
            height: 1
        }), material)

        scene.add(text);
        renderer.render(scene, camera);
    })
}

function addCusGeometry() {
    var geometry = new THREE.Geometry();

    //顶面 4个点
    geometry.vertices.push(new THREE.Vector3(-1, 2, -1));
    geometry.vertices.push(new THREE.Vector3(1, 2, -1));
    geometry.vertices.push(new THREE.Vector3(1, 2, 1));
    geometry.vertices.push(new THREE.Vector3(-1, 2, 1));
    //底面 4个点
    geometry.vertices.push(new THREE.Vector3(-2, 0, -2));
    geometry.vertices.push(new THREE.Vector3(2, 0, -2));
    geometry.vertices.push(new THREE.Vector3(2, 0, 2));
    geometry.vertices.push(new THREE.Vector3(-2, 0, 2));

    //顶面
    geometry.faces.push(new THREE.Face3(0, 1, 3))
    geometry.faces.push(new THREE.Face3(1, 2, 3))
    //底面
    geometry.faces.push(new THREE.Face3(4, 5, 7))
    geometry.faces.push(new THREE.Face3(5, 6, 7))
    //侧面
    geometry.faces.push(new THREE.Face3(1, 5, 6));
    geometry.faces.push(new THREE.Face3(6, 2, 1));
    geometry.faces.push(new THREE.Face3(2, 6, 7));
    geometry.faces.push(new THREE.Face3(7, 3, 2));
    geometry.faces.push(new THREE.Face3(3, 7, 0));
    geometry.faces.push(new THREE.Face3(7, 4, 0));
    geometry.faces.push(new THREE.Face3(0, 4, 5));
    geometry.faces.push(new THREE.Face3(0, 5, 1));

    var cusGeometry = new THREE.Mesh(geometry, material)

    scene.add(cusGeometry);
}

