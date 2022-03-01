const videoElement = document.getElementById("video");

const btn = document.getElementById("btn");

//Promt to select media stream, pass to video element, then play

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {}
}

btn.addEventListener("click", async () => {
  //Diable Button
  btn.disabled = true;

  // Start Picture in Picture
  await videoElement.requestPictureInPicture();

  // Reset button
  btn.disabled = false;
});

selectMediaStream();
