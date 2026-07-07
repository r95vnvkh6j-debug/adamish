(() => {
  window.addEventListener("DOMContentLoaded", () => {

  const dropZone = document.getElementById("drop-zone");
  const browseBtn = document.getElementById("browse-btn");
  const fileInput = document.getElementById("file-input");

  if (!dropZone || !browseBtn || !fileInput) {
    console.error("Upload elements missing");
    return;
  };

const resolutionEl = document.getElementById("resolution");
const fpsEl = document.getElementById("fps");
const bitrateEl = document.getElementById("bitrate");
const codecEl = document.getElementById("codec");
const hdrEl = document.getElementById("hdr");
const filesizeEl = document.getElementById("filesize");
  
  const uploadContent = document.getElementById("upload-content");
  const processingState = document.getElementById("processing-state");
  const successState = document.getElementById("success-state");
  const statusText = document.getElementById("status-text");
  const progressBar = document.getElementById("progress-bar");
  const downloadBtn = document.getElementById("download-btn");

  let processedVideoUrl = null;
  let lastSfxTickPercent = -10;
  let isProcessing = false;

if (!window.FFmpegWASM) {
  console.error("FFmpegWASM global not found. ffmpeg/ffmpeg.js did not load.");
  return;
}

const { FFmpeg } = window.FFmpegWASM;

  const { FFmpeg } = window.FFmpegWASM || {};
  const ffmpeg = FFmpeg ? new FFmpeg() : null;

  ffmpeg?.on("progress", ({ progress }) => {
    setProgress(progress * 100, "Processing video...");
  });

  function setProgress(percent, label = "Processing video...") {
    const safePercent = Math.max(0, Math.min(100, Math.round(percent)));
    progressBar.style.width = `${safePercent}%`;
    statusText.innerText = label;

    if (safePercent - lastSfxTickPercent >= 20) {
      lastSfxTickPercent = safePercent;
      window.KryptonSFX?.play("progress");
    }
  }

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });

 
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragover");
  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    handleFile(e.dataTransfer.files[0]);
  }
});

browseBtn.addEventListener("click", () => {
  console.log("Browse clicked");
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  if (e.target.files && e.target.files.length > 0) {
    handleFile(e.target.files[0]);
  }
});


  async function handleFile(file) {
    filesizeEl.textContent =
  `${(file.size / 1024 / 1024).toFixed(2)} MB`;

const tempVideo = document.createElement("video");

tempVideo.preload = "metadata";

tempVideo.onloadedmetadata = () => {
  resolutionEl.textContent =
    `${tempVideo.videoWidth} × ${tempVideo.videoHeight}`;

  const bitrate =
    (
      (file.size * 8) /
      tempVideo.duration /
      1000000
    ).toFixed(2);

  bitrateEl.textContent =
    `${bitrate} Mbps`;
};

tempVideo.src = URL.createObjectURL(file);
fpsEl.textContent = "-";
codecEl.textContent = "-";
hdrEl.textContent = "-";

    
    if (isProcessing) return;

    if (!file.type.startsWith("video/")) {
      alert("Please upload a valid video file.");
      return;
    }

    isProcessing = true;
    uploadContent.classList.add("hidden");
    successState.classList.add("hidden");
    processingState.classList.remove("hidden");
    progressBar.style.width = "0%";
    progressBar.style.background = "";
    statusText.innerText = "Initializing...";
    lastSfxTickPercent = -10;

    try {
      if (!ffmpeg) {
        throw new Error("FFmpeg engine is unavailable.");
      }

      if (!ffmpeg.loaded) {
        statusText.innerText = "Loading engine...";
      
          await ffmpeg.load({
       coreURL: "/ffmpeg/ffmpeg-core.js",
        wasmURL: "/ffmpeg/ffmpeg-core.wasm",
        });

      }

      setProgress(8, "Reading video info...");
      const inputBytes = new Uint8Array(await file.arrayBuffer());
      await replaceFile("input.mp4", inputBytes);
      

      const patchId = createPatchId();
      const command = [
        "-i", "input.mp4",
        "-map", "0:v:0",
        "-map", "0:a:0?",
        "-map_metadata", "-1",
        "-map_chapters", "-1",
        "-c:v", "copy",
        "-c:a", "copy",
        "-movflags", "+faststart",
        "-metadata", "artist=adamishh.com",
        "-metadata", `comment=Patched by adamishh.com - ${patchId}`,
        "-metadata", "copyright=adamishh.com",
        "-metadata:s:v:0", "language=und",
        "-metadata:s:v:0", "handler_name=VideoHandler",
        "-metadata:s:a:0", "language=und",
        "-metadata:s:a:0", "handler_name=SoundHandler",
      ];

      setProgress(24, "Processing video...");
      await cleanupFiles(["output.mp4"]);
      const exportCode = await runExactExport(command, "output.mp4");
      if (exportCode !== 0) {
        throw new Error(`FFmpeg export failed with exit code ${exportCode}.`);
      }

      setProgress(88, "Processing video...");
      const remuxedBytes = await ffmpeg.readFile("output.mp4");
      if (!remuxedBytes || remuxedBytes.byteLength === 0) {
        throw new Error("The FFmpeg export produced an empty file.");
      }

      const outputBytes = window.KryptonMp4Patcher.patchKryptonContainer(remuxedBytes);
      const blob = new Blob([outputBytes], { type: "video/mp4" });
      if (processedVideoUrl) URL.revokeObjectURL(processedVideoUrl);
      processedVideoUrl = URL.createObjectURL(blob);

      await cleanupFiles(["input.mp4", "output.mp4"]);

      setProgress(100, "Processing video...");
      processingState.classList.add("hidden");
      successState.classList.remove("hidden");
      window.KryptonSFX?.play("success");

      triggerDownload(processedVideoUrl, `adamish_${file.name}`);
      isProcessing = false;
    } catch (error) {
      console.error(error);
      await cleanupFiles(["input.mp4", "output.mp4"]);
      statusText.innerText = "An error occurred.";
      progressBar.style.background = "#EF4444"; // Red for error
      window.KryptonSFX?.play("error");
      isProcessing = false;
    }
  }

  async function runExactExport(commandPrefix, outputName) {
    // Keep the muxing step deterministic. The MP4 table patch runs after this
    // so the encoded audio/video payloads remain copied, not re-encoded.
    return ffmpeg.exec([...commandPrefix, outputName]);
  }

  function createPatchId() {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const randomBytes = new Uint8Array(4);
    crypto.getRandomValues(randomBytes);
    const suffix = Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
    return `${timestamp}_${suffix}`;
  }

  async function replaceFile(name, bytes) {
    try {
      await ffmpeg.deleteFile(name);
    } catch (error) {
      // Missing files are fine; this keeps repeated uploads isolated.
    }
    await ffmpeg.writeFile(name, bytes);
  }

  async function cleanupFiles(names) {
    if (!ffmpeg) return;
    await Promise.all(names.map(async (name) => {
      try {
        await ffmpeg.deleteFile(name);
      } catch (error) {
        // Best-effort cleanup only.
      }
    }));
  }

 
function triggerDownload(url, filename) {
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

downloadBtn?.addEventListener("click", () => {
  if (processedVideoUrl) {
    triggerDownload(processedVideoUrl, "adamish_processed.mp4");
  }
});

  });
})();
