import React from 'react';
import './GettingStarted.css'; // Import the CSS file

const GettingStarted = () => {
  return (
    <div className="getting-started">
      <h1>Getting Started with qBittorrent</h1>
      <h2>Step 1: Download qBittorrent</h2>
      <p>
        Visit the official <a href="https://www.qbittorrent.org/download.php">qBittorrent website</a> to download the latest version of the software.
      </p>
      
      <h2>Step 2: Install qBittorrent</h2>
      <p>
        Once the download is complete, open the installer and follow the on-screen instructions to install qBittorrent on your computer.
      </p>
      
      <h2>Step 3: Downloading Torrents</h2>
      <p>
        To download a torrent, you can either:
      </p>
      <ul>
        <li>Click on a torrent link from a website, which will prompt you to open qBittorrent.</li>
        <li>Download a .torrent file and open it with qBittorrent.</li>
      </ul>
      
      <h2>Step 4: Managing Downloads</h2>
      <p>
        Once you start downloading, you can manage your downloads from the qBittorrent interface. You can pause, resume, or remove downloads as needed.
      </p>
      
      <h2 className="important-note">Important Note</h2>
      <p>
        Always ensure that you are downloading content legally and responsibly.
      </p>
    </div>
  );
};

export default GettingStarted;
