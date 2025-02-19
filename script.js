const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = async function() {
    // Create scene
    const scene = new BABYLON.Scene(engine);
    
    // Add camera
    const camera = new BABYLON.ArcRotateCamera("camera", 0, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    
    // Add lights
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    
    // Load VRM model
    try {
        const result = await BABYLON.SceneLoader.ImportMeshAsync(
            "", 
            "Brianna_model.vrm",  
            scene
        );
        console.log("VRM model loaded:", result);
    } catch (error) {
        console.error("Error loading VRM model:", error);
    }

    // Optional: Enable inspector (press Ctrl+Alt+I to toggle)
    scene.debugLayer.show();

    return scene;
};

// Create and run the scene
createScene().then(scene => {
    engine.runRenderLoop(() => {
        scene.render();
    });
});

// Handle window resize
window.addEventListener("resize", () => {
    engine.resize();
});
