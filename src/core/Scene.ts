import { Camera } from "./Camera";
import { Node2 } from "./Node2";
import { Node3 } from "./Node3";
import { LightManager } from "../lights/LightManager";

/**
 * The Scene class represents a container for 3D and 2D objects.
 */
export class Scene
{
    /**
     * The root node for all 3D elements in the scene.
     */
    public root3d: Node3;

    /**
     * The root node for all 2D elements in the scene.
     */
    public root2d: Node2;

    /**
     * Manager for updating the lights in the scene.
     */
    private lightManager: LightManager;
    
    constructor()
    {
        this.root3d = new Node3();
        this.root2d = new Node2();
        this.lightManager = new LightManager();
    }

    /**
     * Draws the scene by updating the camera's world transform, updating the lights, and drawing the 3D and 2D elements.
     * @param camera - The camera used to draw the scene.
     */
    draw(camera: Camera): void
    {
        // Make sure the camera world transform is computed
        camera.updateWorldMatrix();

        // Update the scene lights
        this.lightManager.clear();
        this.root3d.setLights(this.lightManager);
        this.lightManager.updateLights();

        this.root3d.children.forEach((elem: Node3) => {
            elem.draw(this.root3d, camera, this.lightManager);
        });

        this.root2d.children.forEach((elem: Node2) => {
            elem.draw();
        });
    }

    /**
     * Adds a child element to the scene, either as a Node3 or a Node2.
     * @param child - The child element to add to the scene.
     */
    add(child: Node2 | Node3): void
    {
        if(child instanceof Node3)
        {
            this.root3d.add(child);
        }
        else
        {
            this.root2d.add(child);
        }
    }

    /**
     * Traverses the 3D and 2D elements of the scene, recursively calling the `traverseSceneGraph()` method on each element.
     */
    traverseSceneGraph(): void
    {
        this.root3d.children.forEach((elem: Node3) => {
            elem.traverseSceneGraph();
        });

        this.root2d.children.forEach((elem: Node2) => {
            elem.traverseSceneGraph();
        });
    }
}