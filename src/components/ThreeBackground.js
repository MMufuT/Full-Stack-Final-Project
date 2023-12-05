// ThreeBackground.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

    const starVertices = [];
  for (let i = 0; i < 100000; i++) { // Increase number of stars if needed
    const x = (Math.random() - 0.5) * 4000; // Use a larger range
    const y = (Math.random() - 0.5) * 4000;
    const z = (Math.random() - 0.5) * 4000; // Allow for positive z-values as well
    starVertices.push(x, y, z);
  }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const animate = () => {
        requestAnimationFrame(animate);
    
        // Rotate the camera around the origin
        camera.position.x = Math.sin(Date.now() * 0.0001) * 10;
        camera.position.z = Math.cos(Date.now() * 0.0001) * 10;
        camera.lookAt(scene.position); // Keep the camera looking at the center
    
        renderer.render(scene, camera);
      };

    animate();

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
    
      window.addEventListener('resize', onWindowResize);
    
      // Clean up
      return () => {
        window.removeEventListener('resize', onWindowResize);
        mountRef.current.removeChild(renderer.domElement);
      };
    }, []);

  return <div ref={mountRef} className="three-background" />;

};

export default ThreeBackground;
