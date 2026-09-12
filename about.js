/* =========================================================
   SURREAL — ABOUT PAGE JAVASCRIPT
   Civil Engineering + IT / Digital Ecosystem
   Copy-ready replacement
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initRevealAnimations();
    initCivilExperience();
    initITExperience();
    initAboutInteractions();
});


/* =========================================================
   SHARED HELPERS
========================================================= */

const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

const lerp = (start, end, amount) =>
    start + (end - start) * amount;

const reducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isTouchDevice =
    window.matchMedia("(pointer: coarse)").matches;


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {

    const items =
        document.querySelectorAll(".reveal-item");

    if (!items.length) return;


    if (
        reducedMotion ||
        !("IntersectionObserver" in window)
    ) {

        items.forEach(item => {
            item.classList.add("visible");
        });

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    items.forEach(item => {
        observer.observe(item);
    });

}


/* =========================================================
   CIVIL 3D EXPERIENCE
========================================================= */

let civilScene = null;
let civilCamera = null;
let civilRenderer = null;

let civilRoot = null;

let civilFoundation = null;
let civilColumns = null;
let civilFloors = null;
let civilWindows = null;
let civilRoof = null;
let civilNetwork = null;

let civilTargetRotation = 0;
let civilCurrentRotation = 0;

let civilTargetCameraX = 0;
let civilTargetCameraY = 6;
let civilTargetCameraZ = 23;

let civilCurrentCameraX = 0;
let civilCurrentCameraY = 6;
let civilCurrentCameraZ = 23;


const CIVIL_FLOOR_COUNT = 8;
const CIVIL_FLOOR_HEIGHT = 1.75;
const CIVIL_WIDTH = 7.8;
const CIVIL_DEPTH = 5.5;


const civilStages = [

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
   CIVIL INITIALIZATION
========================================================= */

function initCivilExperience() {

    const container =
        document.getElementById(
            "buildingCanvas"
        );

    if (!container) return;


    if (typeof THREE === "undefined") {

        console.error(
            "Three.js is required for the Civil 3D section."
        );

        return;
    }


    civilScene =
        new THREE.Scene();


    civilScene.background =
        new THREE.Color(
            0x08182b
        );


    civilCamera =
        new THREE.PerspectiveCamera(
            42,
            container.clientWidth /
                Math.max(
                    container.clientHeight,
                    1
                ),
            0.1,
            1000
        );


    civilCamera.position.set(
        0,
        6,
        23
    );


    civilRenderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference:
                "high-performance"
        });


    setCivilPixelRatio();


    civilRenderer.setSize(
        container.clientWidth,
        container.clientHeight
    );


    if (
        "outputColorSpace" in
        civilRenderer
    ) {

        civilRenderer.outputColorSpace =
            THREE.SRGBColorSpace;

    } else {

        civilRenderer.outputEncoding =
            THREE.sRGBEncoding;

    }


    civilRenderer.setClearColor(
        0x08182b,
        1
    );


    container.innerHTML = "";

    container.appendChild(
        civilRenderer.domElement
    );


    createCivilLighting();

    civilRoot =
        new THREE.Group();

    civilScene.add(
        civilRoot
    );


    createCivilGround();
    createCivilFoundation();
    createCivilColumns();
    createCivilFloors();
    createCivilWindows();
    createCivilRoof();
    createCivilNetwork();


    updateCivilScene(0);

    initCivilScroll();


    window.addEventListener(
        "resize",
        resizeCivilScene,
        { passive: true }
    );


    animateCivilScene();

}


/* =========================================================
   CIVIL LIGHTING
========================================================= */

function createCivilLighting() {

    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            1.35
        );

    civilScene.add(ambient);


    const main =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );

    main.position.set(
        10,
        18,
        12
    );

    civilScene.add(main);


    const orange =
        new THREE.PointLight(
            0xf6a91b,
            5,
            38
        );

    orange.position.set(
        -8,
        9,
        6
    );

    civilScene.add(orange);


    const blue =
        new THREE.PointLight(
            0x3f82d1,
            3,
            32
        );

    blue.position.set(
        8,
        7,
        -4
    );

    civilScene.add(blue);

}


/* =========================================================
   CIVIL GROUND
========================================================= */

function createCivilGround() {

    const ground =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                46,
                46
            ),
            new THREE.MeshStandardMaterial({
                color: 0x0c2038,
                roughness: 0.92,
                metalness: 0.04
            })
        );


    ground.rotation.x =
        -Math.PI / 2;

    ground.position.y =
        -0.08;


    civilScene.add(
        ground
    );


    const grid =
        new THREE.GridHelper(
            46,
            46,
            0x2c5579,
            0x17324d
        );


    grid.position.y =
        -0.04;


    civilScene.add(
        grid
    );

}


/* =========================================================
   CIVIL FOUNDATION
========================================================= */

function createCivilFoundation() {

    civilFoundation =
        new THREE.Group();


    const base =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                9,
                0.65,
                6.8
            ),
            new THREE.MeshStandardMaterial({
                color: 0x7a8188,
                roughness: 0.7,
                metalness: 0.12
            })
        );


    base.position.y =
        0.32;


    civilFoundation.add(
        base
    );


    const edge =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                9.15,
                0.10,
                6.95
            ),
            new THREE.MeshStandardMaterial({
                color: 0xf6a91b,
                emissive: 0xf6a91b,
                emissiveIntensity: 0.45
            })
        );


    edge.position.y =
        0.69;


    civilFoundation.add(
        edge
    );


    civilRoot.add(
        civilFoundation
    );

}


/* =========================================================
   CIVIL STRUCTURAL COLUMNS
========================================================= */

function createCivilColumns() {

    civilColumns =
        new THREE.Group();


    const positions = [

        [
            -CIVIL_WIDTH / 2 + 0.4,
            -CIVIL_DEPTH / 2 + 0.4
        ],

        [
            CIVIL_WIDTH / 2 - 0.4,
            -CIVIL_DEPTH / 2 + 0.4
        ],

        [
            -CIVIL_WIDTH / 2 + 0.4,
            CIVIL_DEPTH / 2 - 0.4
        ],

        [
            CIVIL_WIDTH / 2 - 0.4,
            CIVIL_DEPTH / 2 - 0.4
        ]

    ];


    positions.forEach(
        ([x, z]) => {

            for (
                let i = 0;
                i < CIVIL_FLOOR_COUNT;
                i++
            ) {

                const column =
                    new THREE.Mesh(
                        new THREE.BoxGeometry(
                            0.28,
                            CIVIL_FLOOR_HEIGHT,
                            0.28
                        ),
                        new THREE.MeshStandardMaterial({
                            color: 0xb8c0c7,
                            roughness: 0.45,
                            metalness: 0.38
                        })
                    );


                column.position.set(
                    x,

                    1.05 +
                    i *
                    CIVIL_FLOOR_HEIGHT +
                    CIVIL_FLOOR_HEIGHT / 2,

                    z
                );


                column.userData.index =
                    i;


                civilColumns.add(
                    column
                );

            }

        }
    );


    civilRoot.add(
        civilColumns
    );

}


/* =========================================================
   CIVIL FLOORS
========================================================= */

function createCivilFloors() {

    civilFloors =
        new THREE.Group();


    for (
        let i = 0;
        i < CIVIL_FLOOR_COUNT;
        i++
    ) {

        const floor =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    CIVIL_WIDTH,
                    0.18,
                    CIVIL_DEPTH
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x57636d,
                    roughness: 0.55,
                    metalness: 0.24
                })
            );


        floor.position.y =
            1 +
            i *
            CIVIL_FLOOR_HEIGHT;


        floor.userData.index =
            i;


        civilFloors.add(
            floor
        );

    }


    civilRoot.add(
        civilFloors
    );

}


/* =========================================================
   CIVIL WINDOWS
========================================================= */

function createCivilWindows() {

    civilWindows =
        new THREE.Group();


    const glassMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x3276a4,

            emissive: 0x123551,

            emissiveIntensity:
                0.18,

            transparent: true,

            opacity: 0.76,

            roughness: 0.1,

            metalness: 0.5

        });


    for (
        let floor = 0;
        floor < CIVIL_FLOOR_COUNT;
        floor++
    ) {

        const y =
            1.05 +
            floor *
            CIVIL_FLOOR_HEIGHT +
            CIVIL_FLOOR_HEIGHT / 2;


        for (
            let x = -2.7;
            x <= 2.7;
            x += 1.35
        ) {

            const front =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        0.9,
                        1.0,
                        0.06
                    ),
                    glassMaterial.clone()
                );


            front.position.set(
                x,
                y,
                CIVIL_DEPTH / 2 +
                    0.04
            );


            front.userData.index =
                floor;


            civilWindows.add(
                front
            );


            const back =
                front.clone();


            back.position.z =
                -CIVIL_DEPTH / 2 -
                0.04;


            civilWindows.add(
                back
            );

        }


        for (
            let z = -1.8;
            z <= 1.8;
            z += 1.2
        ) {

            const side =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        0.06,
                        1,
                        0.78
                    ),
                    glassMaterial.clone()
                );


            side.position.set(
                CIVIL_WIDTH / 2 +
                    0.04,
                y,
                z
            );


            side.userData.index =
                floor;


            civilWindows.add(
                side
            );


            const opposite =
                side.clone();


            opposite.position.x =
                -CIVIL_WIDTH / 2 -
                0.04;


            civilWindows.add(
                opposite
            );

        }

    }


    civilRoot.add(
        civilWindows
    );

}


/* =========================================================
   CIVIL ROOF
========================================================= */

function createCivilRoof() {

    civilRoof =
        new THREE.Group();


    const roofY =
        1 +
        CIVIL_FLOOR_COUNT *
        CIVIL_FLOOR_HEIGHT;


    const roof =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                CIVIL_WIDTH + 0.4,
                0.3,
                CIVIL_DEPTH + 0.4
            ),
            new THREE.MeshStandardMaterial({
                color: 0x68737c,
                roughness: 0.42,
                metalness: 0.34
            })
        );


    roof.position.y =
        roofY;


    civilRoof.add(
        roof
    );


    const glow =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                CIVIL_WIDTH + 0.55,
                0.10,
                CIVIL_DEPTH + 0.55
            ),
            new THREE.MeshStandardMaterial({
                color: 0xf6a91b,
                emissive: 0xf6a91b,
                emissiveIntensity: 0.4
            })
        );


    glow.position.y =
        roofY + 0.2;


    civilRoof.add(
        glow
    );


    const utility =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.8,
                0.75,
                1.2
            ),
            new THREE.MeshStandardMaterial({
                color: 0x33495e,
                roughness: 0.5,
                metalness: 0.42
            })
        );


    utility.position.set(
        0,
        roofY + 0.55,
        0
    );


    civilRoof.add(
        utility
    );


    civilRoot.add(
        civilRoof
    );

}


/* =========================================================
   CIVIL DIGITAL NETWORK
========================================================= */

function createCivilNetwork() {

    civilNetwork =
        new THREE.Group();


    const nodeMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x4ea6ed,

            emissive: 0x4ea6ed,

            emissiveIntensity: 1.7

        });


    const orangeMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xf6a91b,

            emissive: 0xf6a91b,

            emissiveIntensity: 2

        });


    const core =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.18,
                20,
                20
            ),
            orangeMaterial
        );


    core.position.set(
        0,
        7,
        0
    );


    civilNetwork.add(
        core
    );


    const positions = [

        [-5, 4.5, 0],
        [5, 5.2, 0],
        [-4.2, 9, 0],
        [4.2, 10.2, 0],
        [0, 13, 0]

    ];


    positions.forEach(
        position => {

            const node =
                new THREE.Mesh(
                    new THREE.SphereGeometry(
                        0.13,
                        16,
                        16
                    ),
                    nodeMaterial
                );


            node.position.set(
                ...position
            );


            civilNetwork.add(
                node
            );


            const points = [

                new THREE.Vector3(
                    0,
                    7,
                    0
                ),

                new THREE.Vector3(
                    ...position
                )

            ];


            const geometry =
                new THREE.BufferGeometry()
                    .setFromPoints(
                        points
                    );


            const line =
                new THREE.Line(
                    geometry,
                    new THREE.LineBasicMaterial({
                        color: 0xf6a91b,
                        transparent: true,
                        opacity: 0.46
                    })
                );


            civilNetwork.add(
                line
            );

        }
    );


    civilRoot.add(
        civilNetwork
    );

}


/* =========================================================
   CIVIL SCROLL
========================================================= */

function initCivilScroll() {

    const scrollArea =
        document.querySelector(
            ".building-scroll-area"
        );

    if (!scrollArea) return;


    let ticking = false;


    const update = () => {

        const rect =
            scrollArea.getBoundingClientRect();


        const scrollable =
            Math.max(
                scrollArea.offsetHeight -
                window.innerHeight,
                1
            );


        const progress =
            clamp(
                -rect.top /
                scrollable
            );


        updateCivilScene(
            progress
        );


        ticking = false;

    };


    window.addEventListener(
        "scroll",
        () => {

            if (ticking) return;

            ticking = true;

            requestAnimationFrame(
                update
            );

        },
        {
            passive: true
        }
    );


    update();

}


/* =========================================================
   CIVIL UPDATE
========================================================= */

function updateCivilScene(progress) {

    if (!civilRoot) return;


    progress =
        clamp(progress);


    /* FOUNDATION */

    const foundationProgress =
        clamp(
            progress / 0.16
        );


    civilFoundation.scale.y =
        Math.max(
            foundationProgress,
            0.001
        );


    civilFoundation.position.y =
        -0.55 *
        (
            1 -
            foundationProgress
        );


    /* COLUMNS */

    civilColumns.children
        .forEach(column => {

            const index =
                column.userData.index;

            const start =
                0.08 +
                index *
                0.035;

            const local =
                clamp(
                    (
                        progress -
                        start
                    ) /
                    0.22
                );


            column.scale.y =
                Math.max(
                    local,
                    0.001
                );


            column.visible =
                local > 0.01;

        });


    /* FLOORS */

    civilFloors.children
        .forEach(floor => {

            const index =
                floor.userData.index;

            const start =
                0.15 +
                (
                    index /
                    CIVIL_FLOOR_COUNT
                ) *
                0.4;


            const local =
                clamp(
                    (
                        progress -
                        start
                    ) /
                    0.11
                );


            floor.scale.set(
                local,
                local,
                local
            );


            floor.visible =
                local > 0.01;

        });


    /* WINDOWS */

    civilWindows.children
        .forEach(windowMesh => {

            const index =
                windowMesh.userData.index ||
                0;


            const start =
                0.38 +
                (
                    index /
                    CIVIL_FLOOR_COUNT
                ) *
                0.26;


            const local =
                clamp(
                    (
                        progress -
                        start
                    ) /
                    0.12
                );


            windowMesh.material.opacity =
                local * 0.78;


            windowMesh.visible =
                local > 0.02;

        });


    /* ROOF */

    const roofProgress =
        clamp(
            (
                progress -
                0.65
            ) /
            0.18
        );


    civilRoof.scale.set(
        roofProgress,
        roofProgress,
        roofProgress
    );


    civilRoof.visible =
        roofProgress > 0.01;


    /* NETWORK */

    const networkProgress =
        clamp(
            (
                progress -
                0.73
            ) /
            0.22
        );


    civilNetwork.children
        .forEach(object => {

            object.visible =
                networkProgress >
                0.02;


            if (
                object.material &&
                object.material.opacity !==
                undefined &&
                object.type === "Line"
            ) {

                object.material.opacity =
                    networkProgress *
                    0.5;

            }

        });


    civilNetwork.scale.setScalar(
        Math.max(
            networkProgress,
            0.001
        )
    );


    /* CAMERA */

    civilTargetCameraX =
        Math.sin(
            progress *
            Math.PI *
            1.25
        ) *
        4;


    civilTargetCameraY =
        lerp(
            5.5,
            8.5,
            progress
        );


    civilTargetCameraZ =
        lerp(
            24,
            20,
            progress
        );


    civilTargetRotation =
        lerp(
            -0.25,
            0.62,
            progress
        );


    updateCivilStageUI(
        progress
    );

}


/* =========================================================
   CIVIL STAGE UI
========================================================= */

function updateCivilStageUI(progress) {

    const index =
        Math.min(
            civilStages.length - 1,
            Math.floor(
                progress *
                civilStages.length
            )
        );


    const progressEl =
        document.getElementById(
            "buildingProgress"
        );

    const titleEl =
        document.getElementById(
            "buildingStage"
        );

    const descriptionEl =
        document.getElementById(
            "buildingDescription"
        );

    const completeEl =
        document.getElementById(
            "buildingComplete"
        );


    if (progressEl) {

        progressEl.textContent =
            `${String(index + 1).padStart(2, "0")} / ${String(civilStages.length).padStart(2, "0")}`;

    }


    if (titleEl) {

        titleEl.textContent =
            civilStages[index].title;

    }


    if (descriptionEl) {

        descriptionEl.textContent =
            civilStages[index]
                .description;

    }


    document
        .querySelectorAll(
            ".building-dot"
        )
        .forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === index
                );

            }
        );


    if (completeEl) {

        completeEl.classList.toggle(
            "visible",
            progress > 0.92
        );

    }

}


/* =========================================================
   CIVIL ANIMATION LOOP
========================================================= */

function animateCivilScene() {

    if (
        !civilRenderer ||
        !civilScene ||
        !civilCamera
    ) {

        return;

    }


    requestAnimationFrame(
        animateCivilScene
    );


    civilCurrentCameraX +=
        (
            civilTargetCameraX -
            civilCurrentCameraX
        ) *
        0.045;


    civilCurrentCameraY +=
        (
            civilTargetCameraY -
            civilCurrentCameraY
        ) *
        0.045;


    civilCurrentCameraZ +=
        (
            civilTargetCameraZ -
            civilCurrentCameraZ
        ) *
        0.045;


    civilCamera.position.set(
        civilCurrentCameraX,
        civilCurrentCameraY,
        civilCurrentCameraZ
    );


    civilCamera.lookAt(
        0,
        6.4,
        0
    );


    civilCurrentRotation +=
        (
            civilTargetRotation -
            civilCurrentRotation
        ) *
        0.04;


    if (civilRoot) {

        civilRoot.rotation.y =
            civilCurrentRotation;

    }


    if (civilNetwork) {

        civilNetwork.rotation.y +=
            0.0012;

    }


    civilRenderer.render(
        civilScene,
        civilCamera
    );

}


/* =========================================================
   CIVIL RESIZE
========================================================= */

function resizeCivilScene() {

    const container =
        document.getElementById(
            "buildingCanvas"
        );


    if (
        !container ||
        !civilCamera ||
        !civilRenderer
    ) {

        return;

    }


    const width =
        container.clientWidth;

    const height =
        Math.max(
            container.clientHeight,
            1
        );


    civilCamera.aspect =
        width / height;


    civilCamera.updateProjectionMatrix();


    civilRenderer.setSize(
        width,
        height
    );


    setCivilPixelRatio();

}


function setCivilPixelRatio() {

    if (!civilRenderer) return;


    civilRenderer.setPixelRatio(

        Math.min(

            window.devicePixelRatio,

            window.innerWidth <= 768
                ? 1.35
                : 2

        )

    );

}


/* =========================================================
   IT / DIGITAL ECOSYSTEM
========================================================= */

let itScene = null;
let itCamera = null;
let itRenderer = null;

let itSystem = null;
let itCore = null;
let itServers = null;
let itDatabase = null;
let itCloud = null;
let itInterfaces = null;
let itSecurity = null;
let itConnections = null;
let itParticles = null;

let itTargetRotationY = 0;
let itCurrentRotationY = 0;

let itTargetRotationX = 0;
let itCurrentRotationX = 0;

let itTargetCameraZ = 22;
let itCurrentCameraZ = 22;


const itStages = [

    {
        title: "FOUNDATION",
        description:
            "Reliable digital solutions begin with the right technical foundation."
    },

    {
        title: "SOFTWARE",
        description:
            "Applications turn business processes into practical digital workflows."
    },

    {
        title: "INFRASTRUCTURE",
        description:
            "Servers, databases and cloud services create the backbone behind every system."
    },

    {
        title: "EXPERIENCE",
        description:
            "Interfaces connect people with technology through simple, responsive experiences."
    },

    {
        title: "SECURITY",
        description:
            "Security is built into the ecosystem to protect systems, access and information."
    },

    {
        title: "CONNECTED",
        description:
            "The final system brings software, infrastructure, experience and security together."
    }

];


/* =========================================================
   IT INITIALIZATION
========================================================= */

function initITExperience() {

    const container =
        document.getElementById(
            "it3dCanvas"
        );


    if (!container) return;


    if (typeof THREE === "undefined") {

        console.error(
            "Three.js is required for the IT 3D section."
        );

        return;
    }


    itScene =
        new THREE.Scene();


    itScene.background =
        new THREE.Color(
            0x071526
        );


    itCamera =
        new THREE.PerspectiveCamera(
            45,
            container.clientWidth /
                Math.max(
                    container.clientHeight,
                    1
                ),
            0.1,
            1000
        );


    itCamera.position.set(
        0,
        3,
        22
    );


    itRenderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference:
                "high-performance"
        });


    setITPixelRatio();


    itRenderer.setSize(
        container.clientWidth,
        container.clientHeight
    );


    if (
        "outputColorSpace" in
        itRenderer
    ) {

        itRenderer.outputColorSpace =
            THREE.SRGBColorSpace;

    } else {

        itRenderer.outputEncoding =
            THREE.sRGBEncoding;

    }


    itRenderer.setClearColor(
        0x071526,
        1
    );


    container.innerHTML = "";

    container.appendChild(
        itRenderer.domElement
    );


    createITLighting();


    itSystem =
        new THREE.Group();


    itScene.add(
        itSystem
    );


    createITGround();
    createITCore();
    createITServers();
    createITDatabase();
    createITCloud();
    createITInterfaces();
    createITSecurity();
    createITConnections();
    createITParticles();


    updateITScene(0);

    initITScroll();


    window.addEventListener(
        "resize",
        resizeITScene,
        { passive: true }
    );


    animateITScene();

}


/* =========================================================
   IT LIGHTING
========================================================= */

function createITLighting() {

    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            1.2
        );


    itScene.add(
        ambient
    );


    const orange =
        new THREE.PointLight(
            0xf6a91b,
            4,
            34
        );


    orange.position.set(
        -6,
        6,
        8
    );


    itScene.add(
        orange
    );


    const blue =
        new THREE.PointLight(
            0x3f82d1,
            4,
            34
        );


    blue.position.set(
        7,
        5,
        4
    );


    itScene.add(
        blue
    );


    const purple =
        new THREE.PointLight(
            0x8d78f2,
            4,
            30
        );


    purple.position.set(
        0,
        9,
        -7
    );


    itScene.add(
        purple
    );

}


/* =========================================================
   IT GROUND
========================================================= */

function createITGround() {

    const grid =
        new THREE.GridHelper(
            38,
            38,
            0x5b4cb0,
            0x17304a
        );


    grid.position.y =
        -4.4;


    itScene.add(
        grid
    );

}


/* =========================================================
   IT CENTRAL CORE
========================================================= */

function createITCore() {

    itCore =
        new THREE.Group();


    const outer =
        new THREE.Mesh(
            new THREE.IcosahedronGeometry(
                1.8,
                2
            ),
            new THREE.MeshStandardMaterial({

                color: 0x122f50,

                emissive: 0x3f82d1,

                emissiveIntensity:
                    0.3,

                transparent: true,

                opacity: 0.92,

                roughness: 0.25,

                metalness: 0.55

            })
        );


    itCore.add(
        outer
    );


    const inner =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.74,
                32,
                32
            ),
            new THREE.MeshStandardMaterial({

                color: 0xf6a91b,

                emissive: 0xf6a91b,

                emissiveIntensity: 2

            })
        );


    inner.userData.type =
        "core";


    itCore.add(
        inner
    );


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const ring =
            new THREE.Mesh(
                new THREE.TorusGeometry(
                    2.5 +
                    i * 0.48,
                    0.025,
                    8,
                    100
                ),
                new THREE.MeshBasicMaterial({

                    color:
                        i === 0
                            ? 0xf6a91b
                            : i === 1
                                ? 0x3f82d1
                                : 0x8d78f2,

                    transparent: true,

                    opacity: 0.55

                })
            );


        ring.rotation.x =
            Math.PI / 2 +
            i * 0.28;


        ring.rotation.y =
            i * 0.6;


        ring.userData.ring =
            i;


        itCore.add(
            ring
        );

    }


    itSystem.add(
        itCore
    );

}


/* =========================================================
   IT SERVERS
========================================================= */

function createITServers() {

    itServers =
        new THREE.Group();


    const positions = [

        [-5.8, -1.5, -1.5],
        [5.8, -1.5, -1.5]

    ];


    positions.forEach(
        ([x, y, z], rackIndex) => {

            const rack =
                new THREE.Group();


            for (
                let i = 0;
                i < 5;
                i++
            ) {

                const server =
                    new THREE.Mesh(
                        new THREE.BoxGeometry(
                            2.2,
                            0.58,
                            1.4
                        ),
                        new THREE.MeshStandardMaterial({

                            color: 0x173451,

                            roughness: 0.32,

                            metalness: 0.62

                        })
                    );


                server.position.y =
                    i * 0.72;


                server.userData.index =
                    i;


                rack.add(
                    server
                );


                const light =
                    new THREE.Mesh(
                        new THREE.BoxGeometry(
                            0.12,
                            0.12,
                            0.06
                        ),
                        new THREE.MeshBasicMaterial({

                            color:
                                rackIndex === 0
                                    ? 0x3f82d1
                                    : 0x3f9b72

                        })
                    );


                light.position.set(
                    0.78,
                    i * 0.72,
                    0.73
                );


                rack.add(
                    light
                );

            }


            rack.position.set(
                x,
                y,
                z
            );


            rack.rotation.y =
                rackIndex === 0
                    ? 0.35
                    : -0.35;


            itServers.add(
                rack
            );

        }
    );


    itSystem.add(
        itServers
    );

}


/* =========================================================
   IT DATABASE
========================================================= */

function createITDatabase() {

    itDatabase =
        new THREE.Group();


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const database =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    1.45,
                    1.45,
                    0.62,
                    48
                ),
                new THREE.MeshStandardMaterial({

                    color: 0x342b66,

                    emissive: 0x7357d9,

                    emissiveIntensity:
                        0.22,

                    roughness: 0.32,

                    metalness: 0.48

                })
            );


        database.position.y =
            i * 0.75;


        itDatabase.add(
            database
        );

    }


    itDatabase.position.set(
        -4.5,
        2.3,
        -5
    );


    itSystem.add(
        itDatabase
    );

}


/* =========================================================
   IT CLOUD
========================================================= */

function createITCloud() {

    itCloud =
        new THREE.Group();


    const positions = [

        [4.3, 4.5, -4],
        [5.5, 5.2, -3.5],
        [6.2, 4.1, -4.3],
        [5.1, 3.8, -5]

    ];


    positions.forEach(
        (position, index) => {

            const node =
                new THREE.Mesh(
                    new THREE.SphereGeometry(
                        index === 1
                            ? 0.95
                            : 0.72,
                        24,
                        24
                    ),
                    new THREE.MeshStandardMaterial({

                        color: 0x235a84,

                        emissive: 0x3f82d1,

                        emissiveIntensity:
                            0.38,

                        transparent: true,

                        opacity: 0.94

                    })
                );


            node.position.set(
                ...position
            );


            node.userData.baseY =
                position[1];


            node.userData.index =
                index;


            itCloud.add(
                node
            );

        }
    );


    itSystem.add(
        itCloud
    );

}


/* =========================================================
   IT INTERFACES
========================================================= */

function createITInterfaces() {

    itInterfaces =
        new THREE.Group();


    const positions = [

        [-6, 4, 2.4],
        [6, 3.5, 2.2],
        [0, 6.2, -5.6]

    ];


    positions.forEach(
        (position, index) => {

            const frame =
                new THREE.Group();


            const panel =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        3.1,
                        1.9,
                        0.12
                    ),
                    new THREE.MeshStandardMaterial({

                        color:
                            index === 0
                                ? 0x172f50
                                : index === 1
                                    ? 0x293368
                                    : 0x153e35,

                        emissive:
                            index === 0
                                ? 0x3f82d1
                                : index === 1
                                    ? 0x7357d9
                                    : 0x3f9b72,

                        emissiveIntensity:
                            0.18,

                        roughness: 0.28,

                        metalness: 0.38

                    })
                );


            frame.add(
                panel
            );


            for (
                let row = 0;
                row < 3;
                row++
            ) {

                const bar =
                    new THREE.Mesh(
                        new THREE.BoxGeometry(
                            1.7 -
                            row * 0.25,
                            0.08,
                            0.04
                        ),
                        new THREE.MeshBasicMaterial({

                            color:
                                row === 0
                                    ? 0xf6a91b
                                    : 0x69a5dd

                        })
                    );


                bar.position.set(
                    -0.35,
                    0.5 -
                    row * 0.4,
                    0.085
                );


                frame.add(
                    bar
                );

            }


            frame.position.set(
                ...position
            );


            frame.rotation.y =
                index === 0
                    ? 0.38
                    : index === 1
                        ? -0.38
                        : 0;


            itInterfaces.add(
                frame
            );

        }
    );


    itSystem.add(
        itInterfaces
    );

}


/* =========================================================
   IT SECURITY
========================================================= */

function createITSecurity() {

    itSecurity =
        new THREE.Group();


    const shield =
        new THREE.Mesh(
            new THREE.OctahedronGeometry(
                2.4,
                1
            ),
            new THREE.MeshBasicMaterial({

                color: 0x7357d9,

                wireframe: true,

                transparent: true,

                opacity: 0.45

            })
        );


    itSecurity.add(
        shield
    );


    const ring =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                3.35,
                0.045,
                8,
                100
            ),
            new THREE.MeshBasicMaterial({

                color: 0xf6a91b,

                transparent: true,

                opacity: 0.48

            })
        );


    ring.rotation.x =
        Math.PI / 2;


    itSecurity.add(
        ring
    );


    itSystem.add(
        itSecurity
    );

}


/* =========================================================
   IT CONNECTIONS
========================================================= */

function createITConnections() {

    itConnections =
        new THREE.Group();


    const targets = [

        [-5.2, -0.1, -1.5],
        [5.2, -0.1, -1.5],
        [-4.5, 2.8, -5],
        [5.3, 4.4, -4],
        [-5.5, 4, 2.4],
        [5.5, 3.5, 2.2]

    ];


    targets.forEach(
        (target, index) => {

            const geometry =
                new THREE.BufferGeometry()
                    .setFromPoints([

                        new THREE.Vector3(
                            0,
                            0,
                            0
                        ),

                        new THREE.Vector3(
                            ...target
                        )

                    ]);


            const material =
                new THREE.LineBasicMaterial({

                    color:
                        index % 3 === 0
                            ? 0xf6a91b
                            : index % 3 === 1
                                ? 0x3f82d1
                                : 0x7357d9,

                    transparent: true,

                    opacity: 0.42

                });


            const line =
                new THREE.Line(
                    geometry,
                    material
                );


            itConnections.add(
                line
            );

        }
    );


    itSystem.add(
        itConnections
    );

}


/* =========================================================
   IT PARTICLES
========================================================= */

function createITParticles() {

    const particleCount =
        window.innerWidth <= 768
            ? 180
            : 420;


    const positions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        positions[
            i * 3
        ] =
            (
                Math.random() -
                0.5
            ) *
            24;


        positions[
            i * 3 + 1
        ] =
            (
                Math.random() -
                0.5
            ) *
            15;


        positions[
            i * 3 + 2
        ] =
            (
                Math.random() -
                0.5
            ) *
            18;

    }


    const geometry =
        new THREE.BufferGeometry();


    geometry.setAttribute(

        "position",

        new THREE.BufferAttribute(
            positions,
            3
        )

    );


    const material =
        new THREE.PointsMaterial({

            size: 0.055,

            color: 0x74a7d7,

            transparent: true,

            opacity: 0.58

        });


    itParticles =
        new THREE.Points(
            geometry,
            material
        );


    itScene.add(
        itParticles
    );

}


/* =========================================================
   IT SCROLL
========================================================= */

function initITScroll() {

    const scrollArea =
        document.querySelector(
            ".it3d-scroll-area"
        );


    if (!scrollArea) return;


    let ticking = false;


    const update = () => {

        const rect =
            scrollArea.getBoundingClientRect();


        const scrollable =
            Math.max(
                scrollArea.offsetHeight -
                window.innerHeight,
                1
            );


        const progress =
            clamp(
                -rect.top /
                scrollable
            );


        updateITScene(
            progress
        );


        ticking = false;

    };


    window.addEventListener(
        "scroll",
        () => {

            if (ticking) return;

            ticking = true;

            requestAnimationFrame(
                update
            );

        },
        {
            passive: true
        }
    );


    update();

}


/* =========================================================
   IT UPDATE
========================================================= */

function updateITScene(progress) {

    progress =
        clamp(progress);


    if (!itSystem) return;


    /* FOUNDATION / CORE */

    const coreProgress =
        clamp(
            progress / 0.18
        );


    itCore.scale.setScalar(
        Math.max(
            coreProgress,
            0.001
        )
    );


    /* SOFTWARE INTERFACES */

    const interfaceProgress =
        clamp(
            (
                progress -
                0.12
            ) /
            0.2
        );


    itInterfaces.scale.setScalar(
        Math.max(
            interfaceProgress,
            0.001
        )
    );


    itInterfaces.visible =
        interfaceProgress > 0.01;


    /* SERVERS */

    const serverProgress =
        clamp(
            (
                progress -
                0.28
            ) /
            0.18
        );


    itServers.scale.setScalar(
        Math.max(
            serverProgress,
            0.001
        )
    );


    itServers.visible =
        serverProgress > 0.01;


    /* DATABASE */

    const databaseProgress =
        clamp(
            (
                progress -
                0.36
            ) /
            0.18
        );


    itDatabase.scale.setScalar(
        Math.max(
            databaseProgress,
            0.001
        )
    );


    itDatabase.visible =
        databaseProgress > 0.01;


    /* CLOUD */

    const cloudProgress =
        clamp(
            (
                progress -
                0.44
            ) /
            0.18
        );


    itCloud.scale.setScalar(
        Math.max(
            cloudProgress,
            0.001
        )
    );


    itCloud.visible =
        cloudProgress > 0.01;


    /* SECURITY */

    const securityProgress =
        clamp(
            (
                progress -
                0.61
            ) /
            0.19
        );


    itSecurity.scale.setScalar(
        Math.max(
            securityProgress,
            0.001
        )
    );


    itSecurity.visible =
        securityProgress > 0.01;


    /* CONNECTIONS */

    const connectionProgress =
        clamp(
            (
                progress -
                0.7
            ) /
            0.24
        );


    itConnections.children
        .forEach(line => {

            line.material.opacity =
                connectionProgress *
                0.48;

            line.visible =
                connectionProgress >
                0.01;

        });


    /* CAMERA + ROTATION */

    itTargetRotationY =
        lerp(
            -0.25,
            0.65,
            progress
        );


    itTargetRotationX =
        Math.sin(
            progress *
            Math.PI
        ) *
        0.08;


    itTargetCameraZ =
        lerp(
            23,
            18,
            progress
        );


    updateITStageUI(
        progress
    );

}


/* =========================================================
   IT STAGE UI
========================================================= */

function updateITStageUI(progress) {

    const index =
        Math.min(
            itStages.length - 1,
            Math.floor(
                progress *
                itStages.length
            )
        );


    const progressEl =
        document.getElementById(
            "it3dProgress"
        );

    const stageEl =
        document.getElementById(
            "it3dStage"
        );

    const descriptionEl =
        document.getElementById(
            "it3dDescription"
        );

    const completeEl =
        document.getElementById(
            "it3dComplete"
        );


    if (progressEl) {

        progressEl.textContent =
            `${String(index + 1).padStart(2, "0")} / ${String(itStages.length).padStart(2, "0")}`;

    }


    if (stageEl) {

        stageEl.textContent =
            itStages[index].title;

    }


    if (descriptionEl) {

        descriptionEl.textContent =
            itStages[index]
                .description;

    }


    document
        .querySelectorAll(
            ".it3d-dot"
        )
        .forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === index
                );

            }
        );


    if (completeEl) {

        completeEl.classList.toggle(
            "visible",
            progress > 0.92
        );

    }

}


/* =========================================================
   IT ANIMATION LOOP
========================================================= */

function animateITScene() {

    if (
        !itRenderer ||
        !itScene ||
        !itCamera
    ) {

        return;

    }


    requestAnimationFrame(
        animateITScene
    );


    itCurrentCameraZ +=
        (
            itTargetCameraZ -
            itCurrentCameraZ
        ) *
        0.045;


    itCamera.position.z =
        itCurrentCameraZ;


    itCamera.lookAt(
        0,
        1,
        0
    );


    itCurrentRotationX +=
        (
            itTargetRotationX -
            itCurrentRotationX
        ) *
        0.045;


    itCurrentRotationY +=
        (
            itTargetRotationY -
            itCurrentRotationY
        ) *
        0.045;


    if (itSystem) {

        itSystem.rotation.x =
            itCurrentRotationX;


        itSystem.rotation.y =
            itCurrentRotationY;

    }


    if (itCore) {

        itCore.children
            .forEach(object => {

                if (
                    object.userData.ring !==
                    undefined
                ) {

                    object.rotation.z +=
                        0.002 +
                        object.userData.ring *
                        0.0007;


                    object.rotation.y +=
                        object.userData.ring %
                        2 === 0
                            ? 0.001
                            : -0.0012;

                }


                if (
                    object.userData.type ===
                    "core"
                ) {

                    const pulse =
                        1 +
                        Math.sin(
                            performance.now() *
                            0.002
                        ) *
                        0.055;


                    object.scale.setScalar(
                        pulse
                    );

                }

            });

    }


    if (itCloud) {

        itCloud.children
            .forEach(
                (node, index) => {

                    node.rotation.y +=
                        0.0025 +
                        index *
                        0.0002;


                    if (
                        node.userData.baseY !==
                        undefined
                    ) {

                        node.position.y =
                            node.userData.baseY +
                            Math.sin(
                                performance.now() *
                                0.0013 +
                                index
                            ) *
                            0.15;

                    }

                }
            );

    }


    if (itDatabase) {

        itDatabase.rotation.y +=
            0.0015;

    }


    if (itSecurity) {

        itSecurity.rotation.y -=
            0.0013;

        itSecurity.rotation.z +=
            0.0006;

    }


    if (itParticles) {

        itParticles.rotation.y +=
            0.00045;


        itParticles.rotation.x =
            Math.sin(
                performance.now() *
                0.0002
            ) *
            0.025;

    }


    itRenderer.render(
        itScene,
        itCamera
    );

}


/* =========================================================
   IT RESIZE
========================================================= */

function resizeITScene() {

    const container =
        document.getElementById(
            "it3dCanvas"
        );


    if (
        !container ||
        !itCamera ||
        !itRenderer
    ) {

        return;

    }


    const width =
        container.clientWidth;


    const height =
        Math.max(
            container.clientHeight,
            1
        );


    itCamera.aspect =
        width / height;


    itCamera.updateProjectionMatrix();


    itRenderer.setSize(
        width,
        height
    );


    setITPixelRatio();

}


function setITPixelRatio() {

    if (!itRenderer) return;


    itRenderer.setPixelRatio(

        Math.min(

            window.devicePixelRatio,

            window.innerWidth <= 768
                ? 1.35
                : 2

        )

    );

}


/* =========================================================
   ABOUT PAGE INTERACTIONS
   Matches current Index interaction style
========================================================= */

function initAboutInteractions() {

    initDisciplineLighting();

    initTiltCards();

    initMagneticButtons();

    initDisciplineIcons();

    initInteractiveCards();

    initHeroParallax();

    initStoryRows();

}


/* =========================================================
   DISCIPLINE CARD POINTER LIGHT
========================================================= */

function initDisciplineLighting() {

    document
        .querySelectorAll(
            ".discipline-card"
        )
        .forEach(card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card
                            .getBoundingClientRect();


                    const x =
                        (
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width
                        ) *
                        100;


                    const y =
                        (
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height
                        ) *
                        100;


                    card.style.setProperty(
                        "--card-x",
                        `${x}%`
                    );


                    card.style.setProperty(
                        "--card-y",
                        `${y}%`
                    );

                }
            );

        });

}


/* =========================================================
   CARD TILT
========================================================= */

function initTiltCards() {

    if (
        isTouchDevice ||
        reducedMotion
    ) {

        return;

    }


    const cards =
        document.querySelectorAll(
            ".discipline-card, .value-item, .it3d-service-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card
                        .getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    (
                        (
                            y -
                            rect.height / 2
                        ) /
                        rect.height
                    ) *
                    -2.5;


                const rotateY =
                    (
                        (
                            x -
                            rect.width / 2
                        ) /
                        rect.width
                    ) *
                    2.5;


                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-7px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

function initMagneticButtons() {

    if (
        isTouchDevice ||
        reducedMotion
    ) {

        return;

    }


    document
        .querySelectorAll(
            ".magnetic, .about-hero .btn, .about-final-cta .btn"
        )
        .forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button
                            .getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    button.style.transform =
                        `translate(${x * 0.06}px, ${y * 0.06}px)`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        });

}


/* =========================================================
   DISCIPLINE ICON ANIMATION
========================================================= */

function initDisciplineIcons() {

    if (reducedMotion) return;


    document
        .querySelectorAll(
            ".discipline-card"
        )
        .forEach(card => {

            card.addEventListener(
                "mouseenter",
                () => {

                    const icon =
                        card.querySelector(
                            ".discipline-icon i"
                        );


                    if (!icon) return;


                    icon.animate(

                        [

                            {
                                transform:
                                    "rotate(0deg) scale(1)"
                            },

                            {
                                transform:
                                    "rotate(-8deg) scale(1.08)"
                            },

                            {
                                transform:
                                    "rotate(7deg) scale(1.12)"
                            },

                            {
                                transform:
                                    "rotate(0deg) scale(1)"
                            }

                        ],

                        {
                            duration: 560,
                            easing: "ease"
                        }

                    );

                }
            );

        });

}


/* =========================================================
   FOCUS / TOUCH CARD STATES
========================================================= */

function initInteractiveCards() {

    const cards =
        document.querySelectorAll(
            ".value-item, .story-number, .it3d-service-card, .discipline-card"
        );


    cards.forEach(card => {

        if (
            !card.hasAttribute(
                "tabindex"
            )
        ) {

            card.setAttribute(
                "tabindex",
                "0"
            );

        }


        card.addEventListener(
            "focus",
            () => {

                card.classList.add(
                    "about-active"
                );

            }
        );


        card.addEventListener(
            "blur",
            () => {

                card.classList.remove(
                    "about-active"
                );

            }
        );


        if (isTouchDevice) {

            card.addEventListener(
                "click",
                () => {

                    cards.forEach(
                        otherCard => {

                            if (
                                otherCard !==
                                card
                            ) {

                                otherCard
                                    .classList
                                    .remove(
                                        "about-active"
                                    );

                            }

                        }
                    );


                    card.classList.toggle(
                        "about-active"
                    );

                }
            );

        }

    });

}


/* =========================================================
   HERO PARALLAX
========================================================= */

function initHeroParallax() {

    const hero =
        document.querySelector(
            ".about-hero"
        );


    const heroSide =
        document.querySelector(
            ".about-hero-side"
        );


    if (
        !hero ||
        !heroSide ||
        isTouchDevice ||
        reducedMotion
    ) {

        return;

    }


    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero
                    .getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width -
                0.5;


            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height -
                0.5;


            heroSide.style.transform =
                `translate3d(${x * -14}px, ${y * -11}px, 0)`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            heroSide.style.transform =
                "";

        }
    );

}


/* =========================================================
   STORY ROW INTERACTION
========================================================= */

function initStoryRows() {

    const rows =
        document.querySelectorAll(
            ".story-number"
        );


    rows.forEach(row => {

        row.addEventListener(
            "mouseenter",
            () => {

                rows.forEach(
                    other => {

                        other.classList.toggle(
                            "story-muted",
                            other !== row
                        );

                    }
                );

            }
        );


        row.addEventListener(
            "mouseleave",
            () => {

                rows.forEach(
                    other => {

                        other.classList.remove(
                            "story-muted"
                        );

                    }
                );

            }
        );

    });

}


/* =========================================================
   SMOOTH INTERNAL ABOUT LINKS
========================================================= */

document.addEventListener(
    "click",
    event => {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );


        if (!link) return;


        const href =
            link.getAttribute(
                "href"
            );


        if (
            !href ||
            href === "#"
        ) {

            return;

        }


        const target =
            document.querySelector(
                href
            );


        if (!target) return;


        event.preventDefault();


        const header =
            document.querySelector(
                ".site-header"
            );


        const offset =
            header
                ? header.offsetHeight
                : 0;


        const top =
            target
                .getBoundingClientRect()
                .top +
            window.pageYOffset -
            offset;


        window.scrollTo({

            top,

            behavior:
                reducedMotion
                    ? "auto"
                    : "smooth"

        });

    }
);


/* =========================================================
   PAGE VISIBILITY PERFORMANCE
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            resizeCivilScene();
            resizeITScene();

        }

    }
);


/* =========================================================
   ORIENTATION CHANGE
========================================================= */

window.addEventListener(
    "orientationchange",
    () => {

        setTimeout(
            () => {

                resizeCivilScene();
                resizeITScene();

            },
            250
        );

    }
);


/* =========================================================
   END
========================================================= */
/* =========================================================
   ABOUT HERO — SURREAL DNA INTERACTION
========================================================= */

function initAboutDNAInteraction() {

    const visual =
        document.getElementById(
            "aboutHeroVisual"
        );


    if (!visual) return;


    const cards =
        visual.querySelectorAll(
            ".dna-card, .dna-result"
        );


    const nodes =
        visual.querySelectorAll(
            ".dna-node"
        );


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const touchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (
        reducedMotion ||
        touchDevice
    ) {

        return;

    }


    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    visual.addEventListener(
        "pointermove",
        function (event) {

            const rect =
                visual.getBoundingClientRect();


            targetX =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width -
                .5;


            targetY =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height -
                .5;

        }
    );


    visual.addEventListener(
        "pointerleave",
        function () {

            targetX = 0;
            targetY = 0;

        }
    );


    function animate() {

        currentX +=
            (
                targetX -
                currentX
            ) * .065;


        currentY +=
            (
                targetY -
                currentY
            ) * .065;



        cards.forEach(
            function (
                card,
                index
            ) {

                const strength =
                    5 +
                    index * 2.2;


                card.style.transform =
                    `
                    translate3d(
                        ${currentX * strength}px,
                        ${currentY * strength}px,
                        0
                    )
                    `;

            }
        );



        nodes.forEach(
            function (
                node,
                index
            ) {

                const strength =
                    15 +
                    index * 5;


                node.style.transform =
                    `
                    translate3d(
                        ${currentX * strength}px,
                        ${currentY * strength}px,
                        0
                    )
                    `;

            }
        );


        requestAnimationFrame(
            animate
        );

    }


    animate();

}



/* =========================================================
   OUR PROCESS — CURSOR BACKGROUND
========================================================= */

function initAboutProcessInteraction() {

    const section =
        document.querySelector(
            ".about-process-section"
        );


    if (!section) return;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const touchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (
        reducedMotion ||
        touchDevice
    ) {

        return;

    }


    let targetX = 50;
    let targetY = 50;

    let currentX = 50;
    let currentY = 50;


    section.addEventListener(
        "pointermove",
        function (event) {

            const rect =
                section
                    .getBoundingClientRect();


            targetX =
                (
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width
                ) *
                100;


            targetY =
                (
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height
                ) *
                100;

        }
    );


    section.addEventListener(
        "pointerleave",
        function () {

            targetX = 50;
            targetY = 50;

        }
    );


    function animateProcessGlow() {

        currentX +=
            (
                targetX -
                currentX
            ) *
            .06;


        currentY +=
            (
                targetY -
                currentY
            ) *
            .06;


        section.style.setProperty(
            "--process-x",
            currentX + "%"
        );


        section.style.setProperty(
            "--process-y",
            currentY + "%"
        );


        requestAnimationFrame(
            animateProcessGlow
        );

    }


    animateProcessGlow();

}



document.addEventListener(
    "DOMContentLoaded",
    function () {

        initAboutDNAInteraction();

        initAboutProcessInteraction();

    }
);
/* =========================================================
   SURREAL ABOUT PAGE
   HERO EDITORIAL INTERACTIONS
   + PROCESS CURSOR GLOW
   ========================================================= */


/* =========================================================
   ABOUT HERO — EDITORIAL RIGHT-SIDE INTERACTION
========================================================= */

function initAboutHeroEditorialSide() {

    const heroSide =
        document.getElementById("aboutHeroSide");

    if (!heroSide) return;


    /* -----------------------------------------------------
       ELEMENTS
    ----------------------------------------------------- */

    const nodes =
        heroSide.querySelectorAll(
            ".about-floating-node"
        );

    const cards =
        heroSide.querySelectorAll(
            ".hero-discipline"
        );


    /* -----------------------------------------------------
       ACCESSIBILITY / TOUCH DEVICE CHECK
    ----------------------------------------------------- */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const touchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    /*
       Do not run cursor-follow animations
       on touch devices or when the user
       prefers reduced motion.
    */

    if (
        prefersReducedMotion ||
        touchDevice
    ) {

        return;

    }


    /* -----------------------------------------------------
       CURSOR VALUES
    ----------------------------------------------------- */

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;



    /* -----------------------------------------------------
       POINTER MOVEMENT
    ----------------------------------------------------- */

    heroSide.addEventListener(
        "pointermove",
        event => {

            const rect =
                heroSide.getBoundingClientRect();


            const mouseX =
                event.clientX -
                rect.left;


            const mouseY =
                event.clientY -
                rect.top;


            /*
               Convert cursor position
               approximately from:

               0 → width

               into:

               -0.5 → +0.5
            */

            targetX =
                mouseX /
                Math.max(
                    rect.width,
                    1
                ) -
                0.5;


            targetY =
                mouseY /
                Math.max(
                    rect.height,
                    1
                ) -
                0.5;



            /* ------------------------------------------------
               CARD CURSOR LIGHT
            ------------------------------------------------ */

            cards.forEach(
                card => {

                    const cardRect =
                        card.getBoundingClientRect();


                    const localX =
                        event.clientX -
                        cardRect.left;


                    const localY =
                        event.clientY -
                        cardRect.top;


                    card.style.setProperty(
                        "--mouse-x",
                        `${localX}px`
                    );


                    card.style.setProperty(
                        "--mouse-y",
                        `${localY}px`
                    );

                }
            );

        }
    );



    /* -----------------------------------------------------
       RESET WHEN CURSOR LEAVES
    ----------------------------------------------------- */

    heroSide.addEventListener(
        "pointerleave",
        () => {

            targetX = 0;
            targetY = 0;

        }
    );



    /* -----------------------------------------------------
       SMOOTH NODE FOLLOW ANIMATION
    ----------------------------------------------------- */

    function animateHeroNodes() {

        /*
           Smooth interpolation instead of
           directly following the cursor.
        */

        currentX +=
            (
                targetX -
                currentX
            ) *
            0.075;


        currentY +=
            (
                targetY -
                currentY
            ) *
            0.075;



        nodes.forEach(
            (
                node,
                index
            ) => {

                /*
                   Each node moves at a
                   slightly different speed.

                   This creates depth/parallax.
                */

                const movement =
                    14 +
                    index *
                    8;


                const moveX =
                    currentX *
                    movement;


                const moveY =
                    currentY *
                    movement;


                node.style.transform =
                    `
                    translate3d(
                        ${moveX}px,
                        ${moveY}px,
                        0
                    )
                    `;

            }
        );


        requestAnimationFrame(
            animateHeroNodes
        );

    }


    animateHeroNodes();

}



/* =========================================================
   ABOUT PROCESS — CURSOR BACKGROUND GLOW
========================================================= */

function initAboutProcessCursorGlow() {

    const section =
        document.querySelector(
            ".about-process-section"
        );


    if (!section) return;



    /* -----------------------------------------------------
       ACCESSIBILITY
    ----------------------------------------------------- */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const touchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (
        prefersReducedMotion ||
        touchDevice
    ) {

        return;

    }



    /* -----------------------------------------------------
       DEFAULT POSITION
    ----------------------------------------------------- */

    let targetX = 50;
    let targetY = 50;

    let currentX = 50;
    let currentY = 50;



    /* -----------------------------------------------------
       TRACK CURSOR
    ----------------------------------------------------- */

    section.addEventListener(
        "pointermove",
        event => {

            const rect =
                section.getBoundingClientRect();


            const localX =
                event.clientX -
                rect.left;


            const localY =
                event.clientY -
                rect.top;


            targetX =
                (
                    localX /
                    Math.max(
                        rect.width,
                        1
                    )
                ) *
                100;


            targetY =
                (
                    localY /
                    Math.max(
                        rect.height,
                        1
                    )
                ) *
                100;

        }
    );



    /* -----------------------------------------------------
       RETURN GLOW TO CENTER
    ----------------------------------------------------- */

    section.addEventListener(
        "pointerleave",
        () => {

            targetX = 50;
            targetY = 50;

        }
    );



    /* -----------------------------------------------------
       SMOOTH GLOW MOVEMENT
    ----------------------------------------------------- */

    function animateProcessGlow() {

        currentX +=
            (
                targetX -
                currentX
            ) *
            0.06;


        currentY +=
            (
                targetY -
                currentY
            ) *
            0.06;


        section.style.setProperty(
            "--process-x",
            `${currentX}%`
        );


        section.style.setProperty(
            "--process-y",
            `${currentY}%`
        );


        requestAnimationFrame(
            animateProcessGlow
        );

    }


    animateProcessGlow();

}



/* =========================================================
   DISCIPLINE CARDS
   SUBTLE POINTER LIGHT
========================================================= */

function initAboutDisciplineCardLights() {

    const cards =
        document.querySelectorAll(
            ".discipline-card"
        );


    if (!cards.length) return;


    const touchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (touchDevice) return;



    cards.forEach(
        card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    card.style.setProperty(
                        "--card-x",
                        `${x}px`
                    );


                    card.style.setProperty(
                        "--card-y",
                        `${y}px`
                    );

                }
            );

        }
    );

}



/* =========================================================
   PROCESS STEP HOVER
========================================================= */

function initAboutProcessSteps() {

    const steps =
        document.querySelectorAll(
            ".about-process-step"
        );


    if (!steps.length) return;


    steps.forEach(
        step => {

            step.addEventListener(
                "pointerenter",
                () => {

                    steps.forEach(
                        item => {

                            item.classList.remove(
                                "process-active"
                            );

                        }
                    );


                    step.classList.add(
                        "process-active"
                    );

                }
            );


            step.addEventListener(
                "focusin",
                () => {

                    step.classList.add(
                        "process-active"
                    );

                }
            );


            step.addEventListener(
                "focusout",
                () => {

                    step.classList.remove(
                        "process-active"
                    );

                }
            );

        }
    );

}



/* =========================================================
   HERO DISCIPLINE CARD KEYBOARD SUPPORT
========================================================= */

function initHeroDisciplineFocus() {

    const cards =
        document.querySelectorAll(
            ".hero-discipline"
        );


    if (!cards.length) return;


    cards.forEach(
        card => {

            card.addEventListener(
                "focus",
                () => {

                    card.classList.add(
                        "keyboard-active"
                    );

                }
            );


            card.addEventListener(
                "blur",
                () => {

                    card.classList.remove(
                        "keyboard-active"
                    );

                }
            );

        }
    );

}



/* =========================================================
   HERO TEXT SUBTLE PARALLAX
========================================================= */

function initAboutHeroTextParallax() {

    const hero =
        document.querySelector(
            ".about-hero"
        );


    const content =
        document.querySelector(
            ".about-hero-content"
        );


    if (
        !hero ||
        !content
    ) {

        return;

    }


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const touchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (
        prefersReducedMotion ||
        touchDevice
    ) {

        return;

    }


    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;



    hero.addEventListener(
        "pointermove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                ) /
                Math.max(
                    rect.width,
                    1
                );


            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                Math.max(
                    rect.height,
                    1
                );


            targetX =
                (
                    x -
                    0.5
                ) *
                5;


            targetY =
                (
                    y -
                    0.5
                ) *
                3;

        }
    );


    hero.addEventListener(
        "pointerleave",
        () => {

            targetX = 0;
            targetY = 0;

        }
    );



    function animateHeroContent() {

        currentX +=
            (
                targetX -
                currentX
            ) *
            0.045;


        currentY +=
            (
                targetY -
                currentY
            ) *
            0.045;


        content.style.transform =
            `
            translate3d(
                ${currentX}px,
                ${currentY}px,
                0
            )
            `;


        requestAnimationFrame(
            animateHeroContent
        );

    }


    animateHeroContent();

}



/* =========================================================
   INITIALIZE NEW ABOUT INTERACTIONS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initAboutHeroEditorialSide();

        initAboutProcessCursorGlow();

        initAboutDisciplineCardLights();

        initAboutProcessSteps();

        initHeroDisciplineFocus();

        initAboutHeroTextParallax();

    }
);
/* =========================================================
   ABOUT HERO
   CIVIL + IT INTERACTIVE ILLUSTRATION
========================================================= */

function initAboutHeroWorld() {

    const world =
        document.getElementById(
            "aboutHeroWorld"
        );


    if (!world) {

        return;

    }


    const civilWorld =
        world.querySelector(
            ".civil-mini-world"
        );


    const itWorld =
        world.querySelector(
            ".it-mini-world"
        );


    const layers =
        world.querySelectorAll(
            ".parallax-layer"
        );


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const touchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;



    /* =====================================================
       CIVIL / IT HOVER STATES
    ====================================================== */

    if (civilWorld) {

        civilWorld.addEventListener(
            "pointerenter",
            () => {

                world.classList.add(
                    "civil-hover"
                );


                world.classList.remove(
                    "it-hover"
                );

            }
        );


        civilWorld.addEventListener(
            "pointerleave",
            () => {

                world.classList.remove(
                    "civil-hover"
                );

            }
        );

    }



    if (itWorld) {

        itWorld.addEventListener(
            "pointerenter",
            () => {

                world.classList.add(
                    "it-hover"
                );


                world.classList.remove(
                    "civil-hover"
                );

            }
        );


        itWorld.addEventListener(
            "pointerleave",
            () => {

                world.classList.remove(
                    "it-hover"
                );

            }
        );

    }



    /* =====================================================
       SKIP POINTER 3D ON TOUCH / REDUCED MOTION
    ====================================================== */

    if (
        reducedMotion ||
        touchDevice
    ) {

        return;

    }



    /* =====================================================
       POINTER VALUES
    ====================================================== */

    let targetX = 0;
    let targetY = 0;


    let currentX = 0;
    let currentY = 0;



    /* =====================================================
       POINTER MOVE
    ====================================================== */

    world.addEventListener(
        "pointermove",
        event => {

            const rect =
                world.getBoundingClientRect();


            const localX =
                event.clientX -
                rect.left;


            const localY =
                event.clientY -
                rect.top;



            const percentageX =
                localX /
                Math.max(
                    rect.width,
                    1
                );


            const percentageY =
                localY /
                Math.max(
                    rect.height,
                    1
                );



            targetX =
                percentageX -
                0.5;


            targetY =
                percentageY -
                0.5;



            /* cursor glow */

            world.style.setProperty(
                "--world-x",
                `${percentageX * 100}%`
            );


            world.style.setProperty(
                "--world-y",
                `${percentageY * 100}%`
            );



            /* determine which half cursor is on */

            if (
                percentageX <
                0.50
            ) {

                world.classList.add(
                    "civil-hover"
                );


                world.classList.remove(
                    "it-hover"
                );

            } else {

                world.classList.add(
                    "it-hover"
                );


                world.classList.remove(
                    "civil-hover"
                );

            }

        }
    );



    /* =====================================================
       POINTER LEAVE
    ====================================================== */

    world.addEventListener(
        "pointerleave",
        () => {

            targetX =
                0;


            targetY =
                0;


            world.classList.remove(
                "civil-hover",
                "it-hover"
            );


            world.style.setProperty(
                "--world-x",
                "50%"
            );


            world.style.setProperty(
                "--world-y",
                "50%"
            );

        }
    );



    /* =====================================================
       SMOOTH PARALLAX
    ====================================================== */

    function animateHeroWorld() {

        currentX +=
            (
                targetX -
                currentX
            ) *
            0.06;


        currentY +=
            (
                targetY -
                currentY
            ) *
            0.06;



        layers.forEach(
            layer => {

                const depth =
                    Number(
                        layer.dataset.depth ||
                        5
                    );


                const moveX =
                    currentX *
                    depth;


                const moveY =
                    currentY *
                    depth;



                /*
                   We use CSS custom properties rather
                   than replacing the illustration's
                   existing transforms.
                */

                layer.style.translate =
                    `
                    ${moveX}px
                    ${moveY}px
                    `;

            }
        );



        /* subtle complete-scene perspective */

        const rotateY =
            currentX *
            5;


        const rotateX =
            currentY *
            -4;



        world.style.transform =
            `
            perspective(1400px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            `;



        requestAnimationFrame(
            animateHeroWorld
        );

    }


    animateHeroWorld();

}



/* =========================================================
   DIGITAL ICON HOVER ENERGY
========================================================= */

function initHeroDigitalIcons() {

    const icons =
        document.querySelectorAll(
            "#aboutHeroWorld .digital-icon"
        );


    if (!icons.length) {

        return;

    }



    icons.forEach(
        icon => {

            icon.addEventListener(
                "pointerenter",
                () => {

                    icon.classList.add(
                        "icon-active"
                    );

                }
            );


            icon.addEventListener(
                "pointerleave",
                () => {

                    icon.classList.remove(
                        "icon-active"
                    );

                }
            );

        }
    );

}



/* =========================================================
   CIVIL BUILDING WINDOW REACTION
========================================================= */

function initCivilMiniBuilding() {

    const building =
        document.querySelector(
            "#aboutHeroWorld .mini-building"
        );


    if (!building) {

        return;

    }


    const windows =
        building.querySelectorAll(
            ".building-floor span"
        );



    building.addEventListener(
        "pointerenter",
        () => {

            windows.forEach(
                (
                    windowElement,
                    index
                ) => {

                    windowElement.style.transitionDelay =
                        `${
                            index *
                            18
                        }ms`;

                }
            );

        }
    );



    building.addEventListener(
        "pointerleave",
        () => {

            windows.forEach(
                windowElement => {

                    windowElement.style.transitionDelay =
                        "0ms";

                }
            );

        }
    );

}



/* =========================================================
   INITIALIZE NEW HERO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initAboutHeroWorld();

        initHeroDigitalIcons();

        initCivilMiniBuilding();

    }
);

/* =========================================================
   SURREAL ABOUT PAGE
   FINAL HERO MINIATURE INTERACTION

   Residential House + IT
   Hover-only interaction
   Mobile responsive
========================================================= */


/* =========================================================
   MAIN HERO MINIATURE
========================================================= */

function initAboutHeroWorld() {

    const world =
        document.getElementById("aboutHeroWorld");


    if (!world) {

        return;

    }


    const residentialWorld =
        document.getElementById("residentialWorld");


    const digitalWorld =
        document.getElementById("digitalWorld");


    const depthLayers =
        world.querySelectorAll(".world-depth");


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const isTouchScreen =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;



    /* =====================================================
       MOBILE / TOUCH

       Do not use cursor parallax on mobile.
       Everything remains stable.
    ====================================================== */

    if (
        isTouchScreen ||
        prefersReducedMotion
    ) {

        depthLayers.forEach(
            layer => {

                layer.style.translate =
                    "0px 0px";

            }
        );


        /*
           On touch devices we can still allow a small
           visual activation when the user taps the house
           or IT section.
        */

        if (residentialWorld) {

            residentialWorld.addEventListener(
                "touchstart",
                () => {

                    world.classList.add(
                        "civil-focus"
                    );


                    world.classList.remove(
                        "it-focus"
                    );

                },
                {
                    passive: true
                }
            );

        }


        if (digitalWorld) {

            digitalWorld.addEventListener(
                "touchstart",
                () => {

                    world.classList.add(
                        "it-focus"
                    );


                    world.classList.remove(
                        "civil-focus"
                    );

                },
                {
                    passive: true
                }
            );

        }


        return;

    }



    /* =====================================================
       POINTER ENTER

       Nothing moves before this.
    ====================================================== */

    world.addEventListener(
        "pointerenter",
        () => {

            world.classList.add(
                "world-hovered"
            );

        }
    );



    /* =====================================================
       POINTER MOVE

       IMPORTANT:
       This event belongs to #aboutHeroWorld only.

       Moving your cursor around the rest of the website
       will NOT affect the miniature.
    ====================================================== */

    world.addEventListener(
        "pointermove",
        event => {


            /*
               Extra protection.

               If the illustration is not considered
               hovered, do nothing.
            */

            if (
                !world.classList.contains(
                    "world-hovered"
                )
            ) {

                return;

            }



            const rect =
                world.getBoundingClientRect();



            /* -------------------------------------------------
               POINTER POSITION INSIDE ILLUSTRATION
            -------------------------------------------------- */

            let percentageX =
                (
                    event.clientX -
                    rect.left
                ) /
                Math.max(
                    rect.width,
                    1
                );


            let percentageY =
                (
                    event.clientY -
                    rect.top
                ) /
                Math.max(
                    rect.height,
                    1
                );



            /*
               Prevent values going outside 0 → 1.
            */

            percentageX =
                Math.max(
                    0,
                    Math.min(
                        1,
                        percentageX
                    )
                );


            percentageY =
                Math.max(
                    0,
                    Math.min(
                        1,
                        percentageY
                    )
                );



            /* -------------------------------------------------
               NORMALIZE

               left   = -0.5
               center =  0
               right  =  0.5

               top    = -0.5
               bottom =  0.5
            -------------------------------------------------- */

            const normalizedX =
                percentageX -
                0.5;


            const normalizedY =
                percentageY -
                0.5;



            /* =================================================
               CURSOR LIGHT

               Updates the CSS radial glow.
            ================================================= */

            world.style.setProperty(
                "--world-x",
                `${percentageX * 100}%`
            );


            world.style.setProperty(
                "--world-y",
                `${percentageY * 100}%`
            );



            /* =================================================
               3D-LIKE LAYER MOVEMENT

               This is deliberately subtle.

               The house / monitor do NOT rotate around
               continuously.

               They only shift slightly while being hovered.
            ================================================= */

            depthLayers.forEach(
                layer => {


                    const depth =
                        Number(
                            layer.dataset.depth ||
                            4
                        );



                    const moveX =
                        normalizedX *
                        depth *
                        0.65;



                    const moveY =
                        normalizedY *
                        depth *
                        0.48;



                    layer.style.translate =
                        `${moveX}px ${moveY}px`;

                }
            );



            /* =================================================
               CIVIL / IT COLOR FOCUS

               Left part:
               residential / Civil Engineering

               Right part:
               IT / Digital
            ================================================= */

            if (
                percentageX <
                0.53
            ) {

                world.classList.add(
                    "civil-focus"
                );


                world.classList.remove(
                    "it-focus"
                );

            }

            else {

                world.classList.add(
                    "it-focus"
                );


                world.classList.remove(
                    "civil-focus"
                );

            }

        }
    );



    /* =====================================================
       POINTER LEAVE

       The moment the cursor leaves:

       - animations stop
       - parallax stops
       - house returns
       - IT returns
       - spotlight disappears
    ====================================================== */

    world.addEventListener(
        "pointerleave",
        () => {


            world.classList.remove(
                "world-hovered",
                "civil-focus",
                "it-focus"
            );



            /* reset light */

            world.style.setProperty(
                "--world-x",
                "50%"
            );


            world.style.setProperty(
                "--world-y",
                "50%"
            );



            /* reset every depth layer */

            depthLayers.forEach(
                layer => {

                    layer.style.translate =
                        "0px 0px";

                }
            );

        }
    );



    /* =====================================================
       DIRECT HOUSE HOVER

       If cursor is directly over house,
       make Civil side active.
    ====================================================== */

    if (residentialWorld) {

        residentialWorld.addEventListener(
            "pointerenter",
            () => {


                if (
                    !world.classList.contains(
                        "world-hovered"
                    )
                ) {

                    return;

                }


                world.classList.add(
                    "civil-focus"
                );


                world.classList.remove(
                    "it-focus"
                );

            }
        );

    }



    /* =====================================================
       DIRECT IT HOVER
    ====================================================== */

    if (digitalWorld) {

        digitalWorld.addEventListener(
            "pointerenter",
            () => {


                if (
                    !world.classList.contains(
                        "world-hovered"
                    )
                ) {

                    return;

                }


                world.classList.add(
                    "it-focus"
                );


                world.classList.remove(
                    "civil-focus"
                );

            }
        );

    }

}



/* =========================================================
   RESIDENTIAL HOUSE WINDOWS
========================================================= */

function initResidentialHouseInteraction() {

    const world =
        document.getElementById(
            "aboutHeroWorld"
        );


    if (!world) {

        return;

    }


    const windows =
        world.querySelectorAll(
            ".house-window"
        );


    if (!windows.length) {

        return;

    }



    const isTouchScreen =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;



    if (isTouchScreen) {

        return;

    }



    windows.forEach(
        windowElement => {


            /* ---------------------------------------------
               WINDOW ENTER
            ---------------------------------------------- */

            windowElement.addEventListener(
                "pointerenter",
                () => {


                    windowElement.style.filter =
                        `
                        brightness(1.24)
                        saturate(1.18)
                        `;


                    windowElement.style.boxShadow =
                        `
                        0 0 18px
                        rgba(246,169,27,.12),

                        inset 0 0 16px
                        rgba(63,130,209,.22)
                        `;

                }
            );



            /* ---------------------------------------------
               WINDOW LEAVE
            ---------------------------------------------- */

            windowElement.addEventListener(
                "pointerleave",
                () => {


                    windowElement.style.filter =
                        "";


                    windowElement.style.boxShadow =
                        "";

                }
            );

        }
    );

}



/* =========================================================
   IT ICON INTERACTION
========================================================= */

function initMiniTechIcons() {

    const world =
        document.getElementById(
            "aboutHeroWorld"
        );


    if (!world) {

        return;

    }


    const icons =
        world.querySelectorAll(
            ".mini-tech-icon"
        );


    if (!icons.length) {

        return;

    }



    icons.forEach(
        icon => {


            icon.addEventListener(
                "pointerenter",
                () => {


                    /*
                       Only react when desktop hover
                       is actually active.
                    */

                    if (
                        !world.classList.contains(
                            "world-hovered"
                        )
                    ) {

                        return;

                    }


                    world.classList.add(
                        "it-focus"
                    );


                    world.classList.remove(
                        "civil-focus"
                    );

                }
            );


        }
    );

}



/* =========================================================
   HOUSE LOCAL HOVER
========================================================= */

function initMiniHouseHover() {

    const world =
        document.getElementById(
            "aboutHeroWorld"
        );


    const house =
        document.querySelector(
            "#aboutHeroWorld .mini-house"
        );


    if (
        !world ||
        !house
    ) {

        return;

    }



    const isTouchScreen =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (isTouchScreen) {

        return;

    }



    house.addEventListener(
        "pointerenter",
        () => {


            if (
                !world.classList.contains(
                    "world-hovered"
                )
            ) {

                return;

            }


            world.classList.add(
                "civil-focus"
            );


            world.classList.remove(
                "it-focus"
            );

        }
    );

}



/* =========================================================
   MONITOR LOCAL HOVER
========================================================= */

function initMiniMonitorHover() {

    const world =
        document.getElementById(
            "aboutHeroWorld"
        );


    const monitor =
        document.querySelector(
            "#aboutHeroWorld .digital-monitor"
        );


    if (
        !world ||
        !monitor
    ) {

        return;

    }



    const isTouchScreen =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (isTouchScreen) {

        return;

    }



    monitor.addEventListener(
        "pointerenter",
        () => {


            if (
                !world.classList.contains(
                    "world-hovered"
                )
            ) {

                return;

            }


            world.classList.add(
                "it-focus"
            );


            world.classList.remove(
                "civil-focus"
            );

        }
    );

}



/* =========================================================
   SERVER LOCAL HOVER
========================================================= */

function initMiniServerHover() {

    const world =
        document.getElementById(
            "aboutHeroWorld"
        );


    const server =
        document.querySelector(
            "#aboutHeroWorld .mini-server-rack"
        );


    if (
        !world ||
        !server
    ) {

        return;

    }



    const isTouchScreen =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (isTouchScreen) {

        return;

    }



    server.addEventListener(
        "pointerenter",
        () => {


            if (
                !world.classList.contains(
                    "world-hovered"
                )
            ) {

                return;

            }


            world.classList.add(
                "it-focus"
            );


            world.classList.remove(
                "civil-focus"
            );

        }
    );

}



/* =========================================================
   RESET HERO ON WINDOW RESIZE

   Helpful when moving between desktop/mobile responsive
   layouts.
========================================================= */

function initHeroMiniatureResizeReset() {

    const world =
        document.getElementById(
            "aboutHeroWorld"
        );


    if (!world) {

        return;

    }


    const depthLayers =
        world.querySelectorAll(
            ".world-depth"
        );


    let resizeTimer = null;



    window.addEventListener(
        "resize",
        () => {


            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {


                        world.classList.remove(
                            "world-hovered",
                            "civil-focus",
                            "it-focus"
                        );


                        world.style.setProperty(
                            "--world-x",
                            "50%"
                        );


                        world.style.setProperty(
                            "--world-y",
                            "50%"
                        );


                        depthLayers.forEach(
                            layer => {

                                layer.style.translate =
                                    "0px 0px";

                            }
                        );


                    },
                    120
                );


        },
        {
            passive: true
        }
    );

}



/* =========================================================
   RESET WHEN TAB / WINDOW LOSES FOCUS

   Stops the illustration being left in a hover state.
========================================================= */

function initHeroVisibilityReset() {

    const world =
        document.getElementById(
            "aboutHeroWorld"
        );


    if (!world) {

        return;

    }


    const depthLayers =
        world.querySelectorAll(
            ".world-depth"
        );



    function resetHeroWorld() {


        world.classList.remove(
            "world-hovered",
            "civil-focus",
            "it-focus"
        );


        world.style.setProperty(
            "--world-x",
            "50%"
        );


        world.style.setProperty(
            "--world-y",
            "50%"
        );


        depthLayers.forEach(
            layer => {

                layer.style.translate =
                    "0px 0px";

            }
        );

    }



    window.addEventListener(
        "blur",
        resetHeroWorld
    );


    document.addEventListener(
        "visibilitychange",
        () => {


            if (
                document.hidden
            ) {

                resetHeroWorld();

            }

        }
    );

}



/* =========================================================
   INITIALIZE NEW ABOUT HERO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /*
           initAboutHeroWorld() may already be called by
           your existing About initialization near the top
           of the file.

           Calling it here is intentionally avoided so
           event listeners aren't registered twice.
        */


        initResidentialHouseInteraction();

        initMiniTechIcons();

        initMiniHouseHover();

        initMiniMonitorHover();

        initMiniServerHover();

        initHeroMiniatureResizeReset();

        initHeroVisibilityReset();

    }
);
/* =========================================================
   SURREAL ABOUT PAGE
   FINAL SEPARATED HERO MINIATURE CONTROLLER
   ---------------------------------------------------------
   CIVIL PANEL:
   - Residential house
   - Moves only when Civil panel is hovered

   IT PANEL:
   - Monitor / server / digital system
   - Moves only when IT panel is hovered

   IMPORTANT:
   - No movement from cursor elsewhere in hero
   - No idle animation loop
   - Other panel remains stationary
   - Mobile has no parallax movement
   - Resets correctly on resize / tab switch
========================================================= */


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initSeparatedMiniatureController();

    }
);


/* =========================================================
   MAIN CONTROLLER
========================================================= */

function initSeparatedMiniatureController() {

    const world =
        document.getElementById(
            "aboutHeroWorld"
        );


    if (!world) {

        return;

    }


    /*
       New separated HTML should contain:

       .civil-miniature-panel
       .it-miniature-panel
    */

    const civilPanel =
        world.querySelector(
            ".civil-miniature-panel"
        );


    const itPanel =
        world.querySelector(
            ".it-miniature-panel"
        );


    /*
       If the separated HTML has not been added,
       don't initialize this controller.
    */

    if (
        !civilPanel ||
        !itPanel
    ) {

        return;

    }


    const civilLayers =
        civilPanel.querySelectorAll(
            ".world-depth"
        );


    const itLayers =
        itPanel.querySelectorAll(
            ".world-depth"
        );


    const allLayers =
        world.querySelectorAll(
            ".world-depth"
        );


    const hero =
        world.closest(
            ".about-hero"
        );


    const touchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    const reducedMotionEnabled =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    /* =====================================================
       IMPORTANT FIX
       STOP THE OLD WHOLE-HERO PARALLAX
    ====================================================== */

    /*
       Your old initHeroParallax() applies:

       heroSide.style.transform = ...

       whenever the mouse moves anywhere in .about-hero.

       We cannot remove an anonymous listener after it has
       already been registered, so this later listener
       neutralizes its transform.

       This means moving your cursor over the left hero text
       no longer moves the miniature.
    */

    if (hero) {

        hero.addEventListener(
            "mousemove",
            () => {

                /*
                   Do not let the old script transform
                   the entire miniature wrapper.
                */

                world.style.transform =
                    "";

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                world.style.transform =
                    "";

            }
        );

    }



    /* =====================================================
       RESET HELPERS
    ====================================================== */

    function resetLayer(
        layer
    ) {

        layer.style.translate =
            "0px 0px";

    }


    function resetLayers(
        layers
    ) {

        layers.forEach(
            layer => {

                resetLayer(
                    layer
                );

            }
        );

    }


    function resetCivil() {

        resetLayers(
            civilLayers
        );

    }


    function resetIT() {

        resetLayers(
            itLayers
        );

    }


    function resetAll() {

        world.classList.remove(
            "world-hovered",
            "civil-focus",
            "it-focus",
            "civil-hover",
            "it-hover"
        );


        world.style.setProperty(
            "--world-x",
            "50%"
        );


        world.style.setProperty(
            "--world-y",
            "50%"
        );


        world.style.transform =
            "";


        resetLayers(
            allLayers
        );

    }



    /* =====================================================
       REMOVE OLD INLINE TRANSFORMS
    ====================================================== */

    resetAll();



    /* =====================================================
       MOBILE / TABLET
    ====================================================== */

    if (
        touchDevice ||
        reducedMotionEnabled
    ) {

        /*
           No parallax on mobile.

           Users can tap a panel to give it a small
           visual focus, but the miniature does not
           follow touch movement.
        */

        civilPanel.addEventListener(
            "click",
            () => {

                world.classList.add(
                    "civil-focus"
                );


                world.classList.remove(
                    "it-focus"
                );


                resetIT();

            }
        );


        itPanel.addEventListener(
            "click",
            () => {

                world.classList.add(
                    "it-focus"
                );


                world.classList.remove(
                    "civil-focus"
                );


                resetCivil();

            }
        );


        return;

    }



    /* =====================================================
       WORLD ENTER
    ====================================================== */

    world.addEventListener(
        "pointerenter",
        () => {

            world.classList.add(
                "world-hovered"
            );


            /*
               Protect against older script.
            */

            world.style.transform =
                "";

        }
    );



    /* =====================================================
       WORLD POINTER MOVE
    ====================================================== */

    world.addEventListener(
        "pointermove",
        event => {

            /*
               Only react while cursor is physically
               inside this miniature wrapper.
            */

            if (
                !world.classList.contains(
                    "world-hovered"
                )
            ) {

                return;

            }


            /*
               Again neutralize old hero transform.
            */

            world.style.transform =
                "";



            const worldRect =
                world.getBoundingClientRect();



            let worldX =
                (
                    event.clientX -
                    worldRect.left
                ) /
                Math.max(
                    worldRect.width,
                    1
                );


            let worldY =
                (
                    event.clientY -
                    worldRect.top
                ) /
                Math.max(
                    worldRect.height,
                    1
                );


            worldX =
                limitValue(
                    worldX,
                    0,
                    1
                );


            worldY =
                limitValue(
                    worldY,
                    0,
                    1
                );



            /* =================================================
               LOCAL LIGHT
            ================================================= */

            world.style.setProperty(
                "--world-x",
                `${worldX * 100}%`
            );


            world.style.setProperty(
                "--world-y",
                `${worldY * 100}%`
            );



            /* =================================================
               DETECT WHICH PANEL IS ACTUALLY HOVERED

               This is better than simply dividing the hero
               into left and right halves.

               The connector gap now activates neither panel.
            ================================================= */

            const elementUnderCursor =
                document.elementFromPoint(
                    event.clientX,
                    event.clientY
                );


            const activeCivilPanel =
                elementUnderCursor
                    ?.closest(
                        ".civil-miniature-panel"
                    );


            const activeITPanel =
                elementUnderCursor
                    ?.closest(
                        ".it-miniature-panel"
                    );



            /* =================================================
               CIVIL ACTIVE
            ================================================= */

            if (activeCivilPanel) {

                world.classList.add(
                    "civil-focus"
                );


                world.classList.remove(
                    "it-focus",
                    "civil-hover",
                    "it-hover"
                );


                /*
                   IT remains completely stationary.
                */

                resetIT();


                updatePanelParallax(
                    civilPanel,
                    civilLayers,
                    event
                );


                return;

            }



            /* =================================================
               IT ACTIVE
            ================================================= */

            if (activeITPanel) {

                world.classList.add(
                    "it-focus"
                );


                world.classList.remove(
                    "civil-focus",
                    "civil-hover",
                    "it-hover"
                );


                /*
                   House remains completely stationary.
                */

                resetCivil();


                updatePanelParallax(
                    itPanel,
                    itLayers,
                    event
                );


                return;

            }



            /* =================================================
               CONNECTOR / EMPTY GAP

               Neither miniature moves.
            ================================================= */

            world.classList.remove(
                "civil-focus",
                "it-focus",
                "civil-hover",
                "it-hover"
            );


            resetCivil();

            resetIT();

        }
    );



    /* =====================================================
       CIVIL PANEL DIRECT ENTER
    ====================================================== */

    civilPanel.addEventListener(
        "pointerenter",
        () => {

            world.classList.add(
                "civil-focus"
            );


            world.classList.remove(
                "it-focus",
                "civil-hover",
                "it-hover"
            );


            /*
               Ensure the IT panel does not retain
               movement from an earlier hover.
            */

            resetIT();

        }
    );



    /* =====================================================
       CIVIL PANEL LEAVE
    ====================================================== */

    civilPanel.addEventListener(
        "pointerleave",
        () => {

            resetCivil();


            world.classList.remove(
                "civil-focus"
            );

        }
    );



    /* =====================================================
       IT PANEL DIRECT ENTER
    ====================================================== */

    itPanel.addEventListener(
        "pointerenter",
        () => {

            world.classList.add(
                "it-focus"
            );


            world.classList.remove(
                "civil-focus",
                "civil-hover",
                "it-hover"
            );


            /*
               Ensure house doesn't remain shifted.
            */

            resetCivil();

        }
    );



    /* =====================================================
       IT PANEL LEAVE
    ====================================================== */

    itPanel.addEventListener(
        "pointerleave",
        () => {

            resetIT();


            world.classList.remove(
                "it-focus"
            );

        }
    );



    /* =====================================================
       ENTIRE MINIATURE LEAVE
    ====================================================== */

    world.addEventListener(
        "pointerleave",
        () => {

            resetAll();

        }
    );



    /* =====================================================
       WINDOW RESIZE RESET
    ====================================================== */

    let resizeTimer =
        null;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        resetAll();

                    },
                    120
                );

        },
        {
            passive: true
        }
    );



    /* =====================================================
       WINDOW BLUR RESET
    ====================================================== */

    window.addEventListener(
        "blur",
        () => {

            resetAll();

        }
    );



    /* =====================================================
       TAB VISIBILITY RESET
    ====================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                resetAll();

            }

        }
    );

}



/* =========================================================
   PANEL PARALLAX
========================================================= */

function updatePanelParallax(
    panel,
    layers,
    event
) {

    if (
        !panel ||
        !layers ||
        !layers.length
    ) {

        return;

    }


    const rect =
        panel.getBoundingClientRect();



    let percentageX =
        (
            event.clientX -
            rect.left
        ) /
        Math.max(
            rect.width,
            1
        );


    let percentageY =
        (
            event.clientY -
            rect.top
        ) /
        Math.max(
            rect.height,
            1
        );



    percentageX =
        limitValue(
            percentageX,
            0,
            1
        );


    percentageY =
        limitValue(
            percentageY,
            0,
            1
        );



    /*
       Convert 0 → 1 into:

       -0.5 → 0.5
    */

    const normalizedX =
        percentageX -
        0.5;


    const normalizedY =
        percentageY -
        0.5;



    layers.forEach(
        layer => {


            const depth =
                Number(
                    layer.dataset.depth ||
                    4
                );


            /*
               Keep movement subtle.

               Civil and IT should feel dimensional,
               not like cards floating around wildly.
            */

            const moveX =
                normalizedX *
                depth *
                0.55;


            const moveY =
                normalizedY *
                depth *
                0.38;



            layer.style.translate =
                `${moveX}px ${moveY}px`;

        }
    );

}



/* =========================================================
   VALUE LIMITER
========================================================= */

function limitValue(
    value,
    min,
    max
) {

    return Math.min(
        max,
        Math.max(
            min,
            value
        )
    );

}