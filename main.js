import gsap from 'gsap'
import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl'


import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load('./images/01-3.jpg')
            }
        }

        // map: new THREE.TextureLoader().load('./images/01-3.jpg')
    })
)
scene.add(sphere);

const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    })
);

atmosphere.scale.set(1.1, 1.1, 1.1)
scene.add(atmosphere);

const group = new THREE.Group()
group.add(sphere)
scene.add(group

)
camera.position.z = 15;

const mouse ={
    x:undefined,
    y:undefined
}


function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera);
    sphere.rotation.y += 0.008;
    // group.rotation.y = mouse.x *0.5
    gsap.to(group.rotation, {
        x: -mouse.y * 2,
        y: mouse.x * 2,
        duration : 1
    })
}
animate();

addEventListener('mousemove',()=>{
    mouse.x = (event.clientX / innerWidth)
    *2 - 1
    mouse.y = -(event.clientY / innerHeight) * 2 +1
    console.log(mouse);
})