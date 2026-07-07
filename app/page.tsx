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
          <p className="wordmark">Krypton</p>

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

            <h3>Drag & drop your video</h3>

            <p>or</p>

            <button
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

        <div className="divider">
          <span>Community</span>
        </div>

        <div className="nav-buttons">
         

          
        </div>
      </div>

      /ffmpeg/ffmpeg.js <body>{children}</body>
    </html>
  );
}