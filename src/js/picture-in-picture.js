const videoElement = document.getElementById("video");
const button = document.getElementById("button");

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    if ("srcObject" in videoElement) {
      try {
        videoElement.srcObject = mediaStream;
      } catch (err) {
        if (err.name !== "TypeError") {
          throw err;
        }
        //when browser may only support MediaStream
        videoElement.src = URL.createObjectURL(mediaStream);
      }
    } else {
      videoElement.src = URL.createObjectURL(mediaStream);
    }

    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.error("Error accessing media devices", error);
  }
}

button.addEventListener("click", async () => {
  button.disabled = true;
  await videoElement.requestPictureInPicture();
  button.disabled = false;
});

//on load
selectMediaStream();
