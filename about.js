/* =========================================================
   SURREAL ABOUT PAGE JAVASCRIPT

   FEATURES
   ---------------------------------------------------------
   - Three.js 3D architectural building
   - Scroll-controlled construction
   - Foundation
   - Structural columns
   - Floors
   - Glass facade
   - Windows
   - Rooftop
   - Digital network
   - Scroll-controlled camera
   - Scroll-controlled building perspective
   - Stage progression
   - Reveal animations
   - Responsive rendering
   - Mobile optimization
   - Reduced-motion support
========================================================= */


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let scene = null;
let camera = null;
let renderer = null;

let buildingGroup = null;

let foundation = null;
let floorsGroup = null;
let columnsGroup = null;
let windowsGroup = null;
let roofGroup = null;
let digitalGroup = null;

let buildingScrollProgress = 0;

let targetCameraX = 0;
let targetCameraY = 5;
let targetCameraZ = 22;

let currentCameraX = 0;
let currentCameraY = 5;
let currentCameraZ = 22;

let targetBuildingRotation = 0;
let currentBuildingRotation = 0;


/* =========================================================
   BUILDING SETTINGS
========================================================= */

const BUILDING_WIDTH = 8;
const BUILDING_DEPTH = 6;

const FLOOR_HEIGHT = 2.1;
const FLOOR_COUNT = 8;


/* =========================================================
   STAGES
========================================================= */

const buildingStages = [

    {
        title: "FOUNDATION",
        description:
            "Every strong structure begins with a solid foundation."
    },

    {
        title: "STRUCTURE",
        description:
            "Engineering creates the framework that gives an idea strength."
    },

    {
        title: "DEVELOPMENT",
        description:
            "Each level adds function, purpose and possibility."
    },

    {
        title: "CONNECTION",
        description:
            "Technology connects people, systems and physical spaces."
    },

    {
        title: "REALITY",
        description:
            "A complete solution brings engineering and technology together."
    }

];


/* =========================================================
   PAGE INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeBuilding();

        initializeRevealAnimations();

        initializeScroll();

        optimizeForMobile();

    }
);


/* =========================================================
   THREE.JS INITIALIZATION
========================================================= */

function initializeBuilding() {

    const container =
        document.getElementById(
            "buildingCanvas"
        );


    if (!container) {

        return;

    }


    if (
        typeof THREE ===
        "undefined"
    ) {

        console.error(
            "Three.js could not be loaded."
        );

        return;

    }


    /* -----------------------------------------------------
       SCENE
    ----------------------------------------------------- */

    scene =
        new THREE.Scene();


    scene.background =
        new THREE.Color(
            0x111111
        );


    /* -----------------------------------------------------
       CAMERA
    ----------------------------------------------------- */

    camera =
        new THREE.PerspectiveCamera(

            45,

            container.clientWidth /
                container.clientHeight,

            0.1,

            1000

        );


    camera.position.set(
        0,
        5,
        22
    );


    /* -----------------------------------------------------
       RENDERER
    ----------------------------------------------------- */

    renderer =
        new THREE.WebGLRenderer({

            antialias: true,

            alpha: true,

            powerPreference:
                "high-performance"

        });


    renderer.setPixelRatio(

        Math.min(
            window.devicePixelRatio,
            2
        )

    );


    renderer.setSize(

        container.clientWidth,

        container.clientHeight

    );


    renderer.outputEncoding =
        THREE.sRGBEncoding;


    renderer.setClearColor(
        0x111111,
        1
    );


    container.appendChild(
        renderer.domElement
    );


    /* -----------------------------------------------------
       LIGHTING
    ----------------------------------------------------- */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            1.45
        );


    scene.add(
        ambientLight
    );


    const directionalLight =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );


    directionalLight.position.set(
        10,
        20,
        15
    );


    scene.add(
        directionalLight
    );


    const orangeLight =
        new THREE.PointLight(
            0xf4791d,
            5,
            35
        );


    orangeLight.position.set(
        -8,
        8,
        5
    );


    scene.add(
        orangeLight
    );


    /* -----------------------------------------------------
       BUILDING GROUP
    ----------------------------------------------------- */

    buildingGroup =
        new THREE.Group();


    scene.add(
        buildingGroup
    );


    /* -----------------------------------------------------
       CREATE BUILDING
    ----------------------------------------------------- */

    createGround();

    createFoundation();

    createFloors();

    createColumns();

    createWindows();

    createRoof();

    createDigitalNetwork();


    /* -----------------------------------------------------
       INITIAL STATE
    ----------------------------------------------------- */

    updateBuilding(
        0
    );


    /* -----------------------------------------------------
       RESIZE
    ----------------------------------------------------- */

    window.addEventListener(
        "resize",
        resizeBuilding
    );


    /* -----------------------------------------------------
       START RENDER LOOP
    ----------------------------------------------------- */

    animateBuilding();

}



/* =========================================================
   GROUND
========================================================= */

function createGround() {

    const geometry =
        new THREE.PlaneGeometry(
            45,
            45
        );


    const material =
        new THREE.MeshStandardMaterial({

            color: 0x171717,

            roughness: 0.9,

            metalness: 0.05

        });


    const ground =
        new THREE.Mesh(
            geometry,
            material
        );


    ground.rotation.x =
        -Math.PI / 2;


    ground.position.y =
        -0.05;


    scene.add(
        ground
    );


    /* GRID */

    const grid =
        new THREE.GridHelper(
            45,
            45,
            0x333333,
            0x202020
        );


    grid.position.y =
        0.01;


    scene.add(
        grid
    );

}



/* =========================================================
   FOUNDATION
========================================================= */

function createFoundation() {

    foundation =
        new THREE.Group();


    buildingGroup.add(
        foundation
    );


    /* BASE */

    const geometry =
        new THREE.BoxGeometry(
            9,
            0.65,
            7
        );


    const material =
        new THREE.MeshStandardMaterial({

            color: 0x777777,

            roughness: 0.75,

            metalness: 0.1

        });


    const base =
        new THREE.Mesh(
            geometry,
            material
        );


    base.position.y =
        0.35;


    foundation.add(
        base
    );


    /* ORANGE EDGE */

    const edgeGeometry =
        new THREE.BoxGeometry(
            9.15,
            0.08,
            7.15
        );


    const edgeMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xf4791d,

            emissive: 0xf4791d,

            emissiveIntensity: 0.35

        });


    const edge =
        new THREE.Mesh(
            edgeGeometry,
            edgeMaterial
        );


    edge.position.y =
        0.7;


    foundation.add(
        edge
    );

}



/* =========================================================
   FLOORS
========================================================= */

function createFloors() {

    floorsGroup =
        new THREE.Group();


    buildingGroup.add(
        floorsGroup
    );


    for (
        let i = 0;
        i < FLOOR_COUNT;
        i++
    ) {

        const geometry =
            new THREE.BoxGeometry(
                BUILDING_WIDTH,
                0.18,
                BUILDING_DEPTH
            );


        const material =
            new THREE.MeshStandardMaterial({

                color: 0x4a4a4a,

                roughness: 0.55,

                metalness: 0.25

            });


        const floor =
            new THREE.Mesh(
                geometry,
                material
            );


        floor.position.y =
            1.1 +
            i * FLOOR_HEIGHT;


        floor.userData.floorIndex =
            i;


        floorsGroup.add(
            floor
        );

    }

}



/* =========================================================
   STRUCTURAL COLUMNS
========================================================= */

function createColumns() {

    columnsGroup =
        new THREE.Group();


    buildingGroup.add(
        columnsGroup
    );


    const positions = [

        [-3.5, -2.5],
        [3.5, -2.5],
        [-3.5, 2.5],
        [3.5, 2.5]

    ];


    positions.forEach(
        ([x, z]) => {

            for (
                let i = 0;
                i < FLOOR_COUNT;
                i++
            ) {

                const geometry =
                    new THREE.BoxGeometry(
                        0.28,
                        FLOOR_HEIGHT,
                        0.28
                    );


                const material =
                    new THREE.MeshStandardMaterial({

                        color: 0xb7b7b7,

                        roughness: 0.45,

                        metalness: 0.4

                    });


                const column =
                    new THREE.Mesh(
                        geometry,
                        material
                    );


                column.position.set(

                    x,

                    1.1 +
                    i * FLOOR_HEIGHT +
                    FLOOR_HEIGHT / 2,

                    z

                );


                column.userData.floorIndex =
                    i;


                columnsGroup.add(
                    column
                );

            }

        }
    );

}



/* =========================================================
   WINDOWS
========================================================= */

function createWindows() {

    windowsGroup =
        new THREE.Group();


    buildingGroup.add(
        windowsGroup
    );


    const windowMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x294b5c,

            transparent: true,

            opacity: 0.78,

            roughness: 0.15,

            metalness: 0.5

        });


    for (
        let floor = 0;
        floor < FLOOR_COUNT;
        floor++
    ) {

        const y =
            1.1 +
            floor *
            FLOOR_HEIGHT +
            FLOOR_HEIGHT / 2;


        for (
            let x = -2.4;
            x <= 2.4;
            x += 1.2
        ) {

            createWindow(
                x,
                y,
                3.04,
                windowMaterial,
                floor
            );


            createWindow(
                x,
                y,
                -3.04,
                windowMaterial,
                floor
            );

        }

    }

}



/* =========================================================
   WINDOW CREATION
========================================================= */

function createWindow(
    x,
    y,
    z,
    material,
    floorIndex
) {

    const geometry =
        new THREE.BoxGeometry(
            0.82,
            1.05,
            0.08
        );


    const window =
        new THREE.Mesh(
            geometry,
            material
        );


    window.position.set(
        x,
        y,
        z
    );


    window.userData.floorIndex =
        floorIndex;


    windowsGroup.add(
        window
    );

}



/* =========================================================
   ROOF
========================================================= */

function createRoof() {

    roofGroup =
        new THREE.Group();


    buildingGroup.add(
        roofGroup
    );


    /* ROOF */

    const roofGeometry =
        new THREE.BoxGeometry(
            8.7,
            0.35,
            6.7
        );


    const roofMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x303030,

            roughness: 0.5,

            metalness: 0.3

        });


    const roof =
        new THREE.Mesh(
            roofGeometry,
            roofMaterial
        );


    roof.position.y =
        1.1 +
        FLOOR_COUNT *
        FLOOR_HEIGHT;


    roofGroup.add(
        roof
    );


    /* ROOFTOP CORE */

    const coreGeometry =
        new THREE.BoxGeometry(
            2.3,
            1.2,
            1.8
        );


    const coreMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x555555,

            roughness: 0.5,

            metalness: 0.3

        });


    const core =
        new THREE.Mesh(
            coreGeometry,
            coreMaterial
        );


    core.position.y =
        roof.position.y +
        0.75;


    roofGroup.add(
        core
    );


    /* ANTENNA */

    const antennaGeometry =
        new THREE.CylinderGeometry(
            0.06,
            0.06,
            2.5,
            12
        );


    const antennaMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xf4791d,

            emissive: 0xf4791d,

            emissiveIntensity: 1

        });


    const antenna =
        new THREE.Mesh(
            antennaGeometry,
            antennaMaterial
        );


    antenna.position.y =
        roof.position.y +
        2;


    roofGroup.add(
        antenna
    );

}



/* =========================================================
   DIGITAL NETWORK
========================================================= */

function createDigitalNetwork() {

    digitalGroup =
        new THREE.Group();


    buildingGroup.add(
        digitalGroup
    );


    const nodeMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xf4791d,

            emissive: 0xf4791d,

            emissiveIntensity: 2

        });


    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const geometry =
            new THREE.SphereGeometry(
                0.07,
                12,
                12
            );


        const node =
            new THREE.Mesh(
                geometry,
                nodeMaterial
            );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const radius =
            4.5 +
            Math.random() * 2;


        node.position.set(

            Math.cos(angle) *
            radius,

            2 +
            Math.random() *
            12,

            Math.sin(angle) *
            radius

        );


        digitalGroup.add(
            node
        );

    }

}



/* =========================================================
   BUILDING UPDATE
========================================================= */

function updateBuilding(
    progress
) {

    progress =
        Math.max(
            0,
            Math.min(
                1,
                progress
            )
        );


    buildingScrollProgress =
        progress;


    /* -----------------------------------------------------
       FOUNDATION
    ----------------------------------------------------- */

    foundation.visible =
        true;


    /* -----------------------------------------------------
       FLOOR PROGRESS
    ----------------------------------------------------- */

    const floorProgress =
        Math.min(
            1,
            progress * 1.35
        );


    const visibleFloors =
        Math.ceil(
            floorProgress *
            FLOOR_COUNT
        );


    /* -----------------------------------------------------
       FLOORS
    ----------------------------------------------------- */

    floorsGroup.children.forEach(
        floor => {

            const floorIndex =
                floor.userData.floorIndex;


            floor.visible =
                floorIndex <
                visibleFloors;

        }
    );


    /* -----------------------------------------------------
       COLUMNS
    ----------------------------------------------------- */

    columnsGroup.children.forEach(
        column => {

            const floorIndex =
                column.userData.floorIndex;


            column.visible =
                floorIndex <
                visibleFloors;

        }
    );


    /* -----------------------------------------------------
       WINDOWS
    ----------------------------------------------------- */

    const windowProgress =
        Math.max(
            0,
            (progress - 0.18) /
            0.62
        );


    const visibleWindowFloors =
        Math.ceil(
            windowProgress *
            FLOOR_COUNT
        );


    windowsGroup.children.forEach(
        window => {

            const floorIndex =
                window.userData.floorIndex;


            window.visible =
                floorIndex <
                visibleWindowFloors;

        }
    );


    /* -----------------------------------------------------
       ROOF
    ----------------------------------------------------- */

    roofGroup.visible =
        progress >= 0.68;


    /* -----------------------------------------------------
       DIGITAL NETWORK
    ----------------------------------------------------- */

    digitalGroup.visible =
        progress >= 0.78;


    if (
        progress >= 0.78
    ) {

        const networkProgress =
            Math.min(
                1,
                (progress - 0.78) /
                0.22
            );


        const visibleNodes =
            Math.ceil(
                networkProgress *
                digitalGroup.children.length
            );


        digitalGroup.children.forEach(
            (node, index) => {

                node.visible =
                    index <
                    visibleNodes;

            }
        );

    }


    /* -----------------------------------------------------
       SCROLL-BASED CAMERA
    ----------------------------------------------------- */

    targetCameraX =
        Math.sin(
            progress *
            Math.PI *
            0.65
        ) *
        5.5;


    targetCameraY =
        4.5 +
        progress *
        4.5;


    targetCameraZ =
        23 -
        progress *
        4.5;


    /* -----------------------------------------------------
       SCROLL-BASED BUILDING PERSPECTIVE
       
       IMPORTANT:
       There is NO automatic rotation.
       
       The building only changes perspective
       when the user scrolls.
    ----------------------------------------------------- */

    targetBuildingRotation =
        -0.12 +
        progress *
        0.28;


    /* -----------------------------------------------------
       STAGE UI
    ----------------------------------------------------- */

    updateBuildingStage(
        progress
    );

}



/* =========================================================
   STAGE UI
========================================================= */

function updateBuildingStage(
    progress
) {

    const progressElement =
        document.getElementById(
            "buildingProgress"
        );


    const stageElement =
        document.getElementById(
            "buildingStage"
        );


    const descriptionElement =
        document.getElementById(
            "buildingDescription"
        );


    const completeElement =
        document.getElementById(
            "buildingComplete"
        );


    const dots =
        document.querySelectorAll(
            ".building-dot"
        );


    let stageIndex =
        Math.floor(
            progress * 5
        );


    stageIndex =
        Math.min(
            4,
            stageIndex
        );


    if (progressElement) {

        progressElement.textContent =
            `0${stageIndex + 1} / 05`;

    }


    if (stageElement) {

        stageElement.textContent =
            buildingStages[
                stageIndex
            ].title;

    }


    if (descriptionElement) {

        descriptionElement.textContent =
            buildingStages[
                stageIndex
            ].description;

    }


    dots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === stageIndex
            );

        }
    );


    /* COMPLETION */

    if (completeElement) {

        completeElement.classList.toggle(
            "visible",
            progress > 0.94
        );

    }

}



/* =========================================================
   SCROLL HANDLER
========================================================= */

function initializeScroll() {

    const section =
        document.getElementById(
            "buildingExperience"
        );


    if (!section) {

        return;

    }


    let ticking = false;


    function updateFromScroll() {

        const rect =
            section.getBoundingClientRect();


        const scrollable =
            section.offsetHeight -
            window.innerHeight;


        if (
            scrollable <= 0
        ) {

            return;

        }


        let progress =
            -rect.top /
            scrollable;


        progress =
            Math.max(
                0,
                Math.min(
                    1,
                    progress
                )
            );


        updateBuilding(
            progress
        );

    }


    window.addEventListener(

        "scroll",

        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    () => {

                        updateFromScroll();

                        ticking =
                            false;

                    }
                );


                ticking = true;

            }

        },

        {
            passive: true
        }

    );


    /* INITIAL */

    updateFromScroll();

}



/* =========================================================
   ANIMATION LOOP
========================================================= */

function animateBuilding() {

    requestAnimationFrame(
        animateBuilding
    );


    if (
        !camera ||
        !renderer
    ) {

        return;

    }


    /* -----------------------------------------------------
       SMOOTH CAMERA
    ----------------------------------------------------- */

    currentCameraX +=
        (
            targetCameraX -
            currentCameraX
        ) * 0.045;


    currentCameraY +=
        (
            targetCameraY -
            currentCameraY
        ) * 0.045;


    currentCameraZ +=
        (
            targetCameraZ -
            currentCameraZ
        ) * 0.045;


    camera.position.x =
        currentCameraX;


    camera.position.y =
        currentCameraY;


    camera.position.z =
        currentCameraZ;


    /* -----------------------------------------------------
       CAMERA LOOK AT
    ----------------------------------------------------- */

    camera.lookAt(
        0,
        7,
        0
    );


    /* -----------------------------------------------------
       SCROLL-CONTROLLED BUILDING ROTATION
       
       This is deliberately NOT automatic.
    ----------------------------------------------------- */

    if (buildingGroup) {

        currentBuildingRotation +=
            (
                targetBuildingRotation -
                currentBuildingRotation
            ) * 0.045;


        buildingGroup.rotation.y =
            currentBuildingRotation;

    }


    /* -----------------------------------------------------
       VERY SUBTLE DIGITAL NODE MOVEMENT
       
       This does not rotate the building.
    ----------------------------------------------------- */

    if (
        digitalGroup &&
        digitalGroup.visible
    ) {

        digitalGroup.children.forEach(
            (node, index) => {

                node.position.y +=
                    Math.sin(
                        Date.now() * 0.001 +
                        index
                    ) *
                    0.0005;

            }
        );

    }


    /* -----------------------------------------------------
       RENDER
    ----------------------------------------------------- */

    renderer.render(
        scene,
        camera
    );

}



/* =========================================================
   RESIZE
========================================================= */

function resizeBuilding() {

    const container =
        document.getElementById(
            "buildingCanvas"
        );


    if (
        !container ||
        !camera ||
        !renderer
    ) {

        return;

    }


    camera.aspect =
        container.clientWidth /
        container.clientHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

}



/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function initializeRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal-item"
        );


    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );


        return;

    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "visible"
                                );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}



/* =========================================================
   MOBILE OPTIMIZATION
========================================================= */

function optimizeForMobile() {

    if (
        !camera
    ) {

        return;

    }


    if (
        window.innerWidth <= 700
    ) {

        camera.fov =
            48;

        camera.position.z =
            25;

        camera.updateProjectionMatrix();

    } else {

        camera.fov =
            45;

        camera.updateProjectionMatrix();

    }

}


window.addEventListener(
    "resize",
    optimizeForMobile
);



/* =========================================================
   REDUCED MOTION
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (
    prefersReducedMotion.matches
) {

    document.documentElement.classList.add(
        "reduced-motion"
    );

}



/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%cSURREAL About Page",
    "font-size:18px;font-weight:bold;"
);


console.log(
    "Scroll-controlled 3D architectural experience initialized."
);