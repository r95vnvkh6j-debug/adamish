"use client";

import Script from "next/script";

export default function Home() {
  return (
    <>
      <div className="ambient-blur"></div>
      <div className="grain"></div>
      <div className="cursor-glow" id="cursor-glow"></div>

      <div className="container">
        <header>
          <p className="wordmark">Adamishh</p>

          <h1>
            No More Compression
            <br />
            On TikTok
          </h1>
        </header>

        <div
          className="glass-panel upload-zone tilt"
          id="drop-zone"
        >
          <div id="upload-content">
            <div className="upload-icon">📤</div>

            <h3>Drag &amp; drop your video</h3>

            <p>or</p>

           <button
  type="button"
  className="btn-pill btn-primary"
  id="browse-btn"
>
              <span>Browse Files</span>
            </button>

            <input
              type="file"
              id="file-input"
              accept="video/*"
              hidden
            />
          </div>

          <div id="processing-state" className="hidden">
            <div className="spinner"></div>

            <h3 id="status-text">
              Initializing...
            </h3>

            <div className="progress-bar-container">
              <div
                id="progress-bar"
                className="progress-bar"
              />
            </div>
          </div>

          <div id="success-state" className="hidden">
            <h3>Processing Complete</h3>

            <button
              id="download-btn"
              className="btn-pill btn-primary"
            >
              Download Video
            </button>
          </div>
        </div>

        {/* Video Information */}
        <div className="glass-panel video-info" id="video-info">
          <h3>Video Information</h3>

          <div className="info-grid">
            <div className="info-item">
              <span>Resolution</span>
              <strong id="resolution">-</strong>
            </div>

            <div className="info-item">
              <span>FPS</span>
              <strong id="fps">-</strong>
            </div>

            <div className="info-item">
              <span>Bitrate</span>
              <strong id="bitrate">-</strong>
            </div>

            <div className="info-item">
              <span>Codec</span>
              <strong id="codec">-</strong>
            </div>

            <div className="info-item">
              <span>HDR Detected</span>
              <strong id="hdr">-</strong>
            </div>

            <div className="info-item">
              <span>File Size</span>
              <strong id="filesize">-</strong>
            </div>
          </div>
        </div>

        <div className="divider">
          <span>Community</span>
        </div>

        <div className="nav-buttons">
          {/* Lägg dina knappar här */}
        </div>
      </div>

<Script
  src="/ffmpeg/ffmpeg.js"
  strategy="afterInteractive"
/>

<Script
  src="/mp4-container-patcher.js"
  strategy="afterInteractive"
  onLoad={() => console.log("MP4 patcher loaded", window.KryptonMp4Patcher)}
/>

<Script
  src="/popup.js"
  strategy="afterInteractive"
/>
    </>
  );
}
