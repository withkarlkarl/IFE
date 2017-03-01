var renderer, scene, camera, material;

init();

function init() {
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('demo')
    })
    renderer.setClearColor(0x000000);

    scene = new THREE.Scene();

    perspective();

    return setRepeatMaterial()

    renderer.render(scene, camera);
}

function perspective() {
    camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 20)
    camera.position.set(10, 10, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    scene.add(camera);
}

function addCube() {
    var cube = new THREE.Mesh(new THREE.CubeGeometry(5, 5, 5), material)

    scene.add(cube)
}

function setBasicMaterial() {
    material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide
    })
}

function setNormalMaterial() {
    material = new THREE.MeshNormalMaterial();
}

function setLambertMaterial() {
    material = new THREE.MeshLambertMaterial({
        emissive: "red",
        side: THREE.DoubleSide
    })
}

function setPhongMaterial() {
    material = new THREE.MeshPhongMaterial({
        // color: "red",
        emissive: "red",
        specular: "blue",
        shininess: 1000,
        side: THREE.DoubleSide
    })
}

function setImgMaterial() {
    var loader = new THREE.TextureLoader();

    loader.load("src/img/01YdRBbTLpi6.png", function (img) {
        console.log(img)

        material = new THREE.MeshBasicMaterial({
            map: img
        })

        addCube();

        renderer.render(scene, camera)
    })
}

function setCubeImgMaterial() {
    var imgs = [
        'src/img/01YdRBbTLpi6.png' ,
        'src/img/01YdRBbTLpi6.png',
        'src/img/01YdRBbTLpi6.png',
        'src/img/01YdRBbTLpi6.png',
        'src/img/01YdRBbTLpi6.png',
        'src/img/01YdRBbTLpi6.png'
    ];
    var loader = new THREE.TextureLoader();

    var materials = [];
    imgs.forEach(function (img) {
        loader.load(img, function (texture) {
            var material = new THREE.MeshBasicMaterial({
                map: texture
            })
            materials.push(material);
            if(materials.length === 6) {
                var cube = faceCube(materials)

                scene.add(cube);
                renderer.render(scene, camera);
            }
        })
    })
}

function faceCube(materials) {
    var cube = new THREE.Mesh(new THREE.CubeGeometry(5, 5, 5),
        new THREE.MeshFaceMaterial(materials));
    return cube;
}

function setRepeatMaterial() {
    var loader = new THREE.TextureLoader();

    loader.load('src/img/01YdRC86nAUx.png', function (texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 4)
        material = new THREE.MeshBasicMaterial({
            map: texture
        })

        addCube();

        renderer.render(scene, camera)
    })
}