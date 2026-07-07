"use client";

import Script from "next/script";

export default function Home() {
  return (
    <>
      <div className="container">
        <h1>Adamish Uploader</h1>

        <div id="drop-zone">
          <div id="upload-content">
            <button id="browse-btn">
              Browse Files
            </button>

            <input
              type="file"
              id="file-input"
              accept="video/*"
              hidden
            />
          </div>

          <div
            id="processing-state"
            className="hidden"
          >
            <h3 id="status-text">
              Initializing...
            </h3>

            <div id="progress-bar"></div>
          </div>

          <div
            id="success-state"
            className="hidden"
          >
            <button id="download-btn">
              Download Video
            </button>
          </div>
        </div>

        <div>
          <a
            href="https://www.tiktok.com/@adamishh"
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok
          </a>

          {" | "}

          <a
            href="https://discord.gg/9Wf9CVXWmr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
        </div>
      </div>

      /ffmpeg/ffmpeg.js.js"
        strategy="afterInteractive"
      />

      /sfx.js <Script
        src="/interactions.js"
        strategy);
}
      
