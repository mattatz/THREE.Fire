/**
 * @author mattatz / http://github.com/mattatz
 *
 * Ray tracing based real-time procedural volumetric fire object for three.js
 */

THREE.Fire = function ( fireTex, color ) {

	var fireMaterial = new THREE.ShaderMaterial( {
        defines         : THREE.FireShader.defines,
        uniforms        : THREE.UniformsUtils.clone( THREE.FireShader.uniforms ),
        vertexShader    : THREE.FireShader.vertexShader,
        fragmentShader  : THREE.FireShader.fragmentShader,
		transparent     : true,
		depthWrite      : false,
        depthTest       : false
	} );

    // initialize uniforms 

    fireTex.magFilter = fireTex.minFilter = THREE.LinearFilter;
    fireTex.wrapS = fireTex.wrapT = THREE.ClampToEdgeWrapping;
    
    fireMaterial.uniforms.fireTex.value = fireTex;
    fireMaterial.uniforms.color.value = color || new THREE.Color( 0xeeeeee );
    fireMaterial.uniforms.invModelMatrix.value = new THREE.Matrix4();
    fireMaterial.uniforms.scale.value = new THREE.Vector3( 1, 1, 1 );
    fireMaterial.uniforms.seed.value = Math.random() * 19.19;

	THREE.Mesh.call( this, new THREE.BoxGeometry( 1.0, 1.0, 1.0 ), fireMaterial );
};

THREE.Fire.prototype = Object.create( THREE.Mesh.prototype );
THREE.Fire.prototype.constructor = THREE.Fire;

THREE.Fire.prototype.update = function ( time ) {

    var invModelMatrix = this.material.uniforms.invModelMatrix.value;

    this.updateMatrixWorld();
    invModelMatrix.getInverse( this.matrixWorld );

    if( time !== undefined ) {
        this.material.uniforms.time.value = time;
    }

    this.material.uniforms.invModelMatrix.value = invModelMatrix;

    this.material.uniforms.scale.value = this.scale;

};
