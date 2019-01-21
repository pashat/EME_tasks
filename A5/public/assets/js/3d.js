let scene;
let camera;
let renderer;
let canvas;
let myMap;
let data;


const material = new THREE.MeshLambertMaterial({ color: 0x50D050, side: 10 });
let meshes = [];
let light;


$(() => {
    canvas = $("#map")[0];
    initMappa();
    initThree();
    myMap.onChange(repositionMeshes);
    updateData(() => {
        generateMeshes();
    });
    animationLoop();
    $("#config li").change(generateMeshes);
});

function initMappa() {
    const key = "pk.eyJ1IjoicGlra3UiLCJhIjoiY2pwenloamxoMDl0djQybWxlY3hkaGVpZSJ9.MKRV1BETvooEv5r_dEaXTQ";
    const options = {
        lat: 0,
        lng: 0,
        zoom: 2,
        style: "mapbox://styles/mapbox/basic-v9",
        pitch: 50
    };
    const mappa = new Mappa("MapboxGL", key);
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
}

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(85, canvas.width / canvas.height, 0.5, 10000);
    renderer = new THREE.WebGLRenderer({alpha: true, canvas: canvas});
    camera.position.y = 10;
    camera.position.z = 400;
    scene.add(camera);
    renderer.setSize(canvas.width, canvas.height);
}
function generateMeshes() {
    meshes.length = 0;
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }

    light = new THREE.PointLight(0xffffff, 1.8);
    light.position.set(50, 50, 50);
    scene.add(light);

    const Attribute = getSelectedAttribute();
    const values = data.map(country => country[Attribute]);
    const maxValue = Math.max.apply(null, values);
    const minimumValue = Math.min.apply(null, values);
    const valueRange = maxValue - minimumValue;

    for (const country of data) {
        let value = country[Attribute];
        const geometry = new THREE.BoxGeometry(10, 10, value );
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        meshes.push([country, mesh, Attribute]);
    }

    repositionMeshes();
}

function repositionMeshes() {
    for ([country, mesh, value] of meshes ? meshes : []) {
        //https://mappa.js.org/docs/examples-three-js.html
        const pos = myMap.latLngToPixel(country.gps_lat, country.gps_long);
        const vector = new THREE.Vector3();
        vector.set((pos.x / canvas.width) * 2 - 1, -(pos.y / canvas.height) * 2 + 1, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const newPos = camera.position.clone().add(dir.multiplyScalar(distance));
        mesh.position.set(newPos.x, newPos.y, newPos.z);
    }
}
function updateData(callback) {
    $.ajax({
        url: "/items",
        success: c => {
            data = [];
            for (const key in c) {
                if (c.hasOwnProperty(key)) {
                    data.push(c[key]);
                }
            }
            if (callback) callback();
        }
    });
}

function animationLoop() {
    requestAnimationFrame(animationLoop);
    renderer.render(scene, camera);
}

function getSelectedAttribute() {
    return $("#config input:checked")[0].value;
}
