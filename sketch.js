// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// https://learn.ml5js.org/#/reference/posenet

/* ===
ml5 Example
PoseNet example using p5.js
=== */
// Global Variables
let capture;
let poseNet;
let poses = []; // this array will contain our detected poses (THIS IS THE IMPORTANT STUFF)
const cam_w = 640;
const cam_h = 480;

const options = {
  architecture: "MobileNetV1",
  imageScaleFactor: 0.3,
  outputStride: 16, // 8, 16 (larger = faster/less accurate)
  flipHorizontal: true,
  minConfidence: 0.5,
  maxPoseDetections: 2, // 5 is the max
  scoreThreshold: 0.5,
  nmsRadius: 20,
  detectionType: "multiple",
  inputResolution: 257, // 161, 193, 257, 289, 321, 353, 385, 417, 449, 481, 513, or 801, smaller = faster/less accurate
  multiplier: 0.5, // 1.01, 1.0, 0.75, or 0.50, smaller = faster/less accurate
  quantBytes: 2,
};

function setup() {
  createCanvas(cam_w, cam_h);
  capture = createCapture(VIDEO);
  capture.size(cam_w, cam_h);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(capture, options, modelReady);

  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected.
  poseNet.on("pose", function (results) {
    poses = results;
  });

  // Hide the capture element, and just show the canvas
  capture.hide();
}

// this function gets called once the model loads successfully.
function modelReady() {
  console.log("Model loaded");
}

function draw() {
  // mirror the capture being drawn to the canvas
  push();
  translate(width, 0);
  scale(-1, 1);
  image(capture, 0, 0);
  pop();

  if (poses.length > 0) {
    checkIfRightHandRaised();
  }
}

function checkIfRightHandRaised() {
  // store the first pose in a variable called "pose"
  let pose = poses[0].pose;

  let rightWrist = pose.rightWrist;
  let nose = pose.nose;

  // store the y positions of the right wrist and nose so that we can compare them
  let rightWristX = rightWrist.x;
  let rightWristY = rightWrist.y;
  let noseX = nose.x;
  let noseY = nose.y;
  
  // check if hand is raised (if wristY is less than noseY)
  if(rightWristY < noseY - 100) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  
  ellipse(rightWristX, rightWristY, 30, 30);

  
}
