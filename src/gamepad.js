const haveEvents = 'ongamepadconnected' in window;
const controllers = {};
const buttonNames = ["A", "B", "X", "Y", "LB", "RB", "Back", "Start", "?", "Left Stick", "Right Stick"];
const axisNames = ["Left stick X", "Left Stick Y", "LT", "Right Stick X", "Right Stick Y", "RT","D-Pad Hor", "D-Pad Ver"]

// 2 gamepads are added: unknown gamepad and Xbox 360 controller
function connecthandler(e) {
    console.log("gamepad connected");
    addgamepad(e.gamepad);
}

function addgamepad(gamepad) {
    controllers[gamepad.index] = gamepad;
    requestAnimationFrame(updateStatus);
}

function disconnecthandler(e) {
    removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
    // const d = document.getElementById(`controller${gamepad.index}`);
    // document.body.removeChild(d);
    delete controllers[gamepad.index];
}

function updateStatus() {
    if (!haveEvents) {
        scangamepads();
    }

    for (const j in controllers) {
        let controller = controllers[j];
        // const d = document.getElementById(`controller${j}`);
        // const buttons = d.getElementsByClassName("button");

        controller.buttons.forEach((button, i) => {
            let message = "Not Pressed";
            if (button.pressed) {
                message = "Pressed"
                console.log('Button %s: pressed',buttonNames[i]);
            }
            // buttons[i].innerHTML = `Button ${buttonNames[i]}: ${message}`;
        });

        // const axes = d.getElementsByClassName("axis");
        controller.axes.forEach((axis, i) => {
          let message = axis;
        //   axes[i].innerHTML = `${axisNames[i]}: ${axis}`;
        });
    };

    requestAnimationFrame(updateStatus);
}

function scangamepads() {
    const gamepads = navigator.getGamepads();
    for (const gamepad of gamepads) {
        if (gamepad) { // Can be null if disconnected during the session
            if (gamepad.index in controllers) {
                controllers[gamepad.index] = gamepad;
            } else {
                addgamepad(gamepad);
            }
        }
    }
}

// window.addEventListener("gamepadconnected", connecthandler);
// window.addEventListener("gamepaddisconnected", disconnecthandler);

if (!haveEvents) {
    setInterval(scangamepads, 500);
}

export {connecthandler, disconnecthandler};