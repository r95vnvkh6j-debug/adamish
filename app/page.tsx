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
          <p className="wordmark">Adamish</p>

          <h1>
            No More Compression
            <br />
            On TikTok
          </h1>
        </header>

        <div className="glass-panel upload-zone tilt" id="drop-zone">
          <div id="upload-content">
            <div className="upload-icon">📤</div>

            <h3>Drag &amp; drop your video</h3>

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
              ></div>
            </div>
          </div>

          <div id="success-state" className="hidden">
            <div className="success-icon">✅</div>

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
          https://www.tiktok.com/@adamishh"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-glass tilt"
          >
            <span>TikTok</span>
          </a>

          9Wf9CVXWmr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-glass tilt"
          >
            <span>Discord</span>
          </a>
        </div>
      </div>

      ffmpeg/ffmpeg.js"
        strategy="afterInteractive"
      />

      /mp4-container-patcher.jsfx.js"
        strategy="afterInteractive"
      />

      /interactions.js      /popup.js. Spara
2. Commit
3. Push
4. Redeploy

Detta är första gången i chatten som `page.tsx` är komplett med korrekta `<Script />`-taggar.

