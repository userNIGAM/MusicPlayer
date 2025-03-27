🎵 React Music Player App 🎶
A fully functional music player built using React, designed with a sleek UI and core features such as play/pause, next/previous buttons, shuffle functionality, and a dynamic progress bar that lets users seek within the song. The player also supports a visual song cover and displays the song title, artist name, and duration.

🖼️ Features
Play/Pause: Toggle between playing and pausing the song.

Next/Previous Buttons: Play the next or previous song.

Shuffle Mode: Shuffle the songs, with proper handling of "Previous" functionality even when shuffle is enabled.

Dynamic Progress Bar: Seek within the song by clicking on the progress bar.

Song Information: Displays the current song title, artist, and song duration (in minutes and seconds).

Song Cover Image: Dynamically changes the background image and cover when the song changes.

📁 Folder Structure
bash
Copy
Edit
/music-player-app
│
├── public  
├── src  
│   ├── assets  
│   │   ├── musicList.js       # Exports songs with title, artist, and image  
│   │   ├── song1.mp3          # Audio files used in the project  
│   │   ├── song2.mp3  
│   │   ├── song3.mp3  
│   └── index.css              # Custom styles for the music player  
│   └── App.js                 # Main React component handling the music player logic  
├── README.md                  # Documentation for the project  
└── package.json               # Project dependencies and scripts  
🛠️ Tech Stack
Frontend: React, CSS

Icons: Font Awesome (React Icons)

Package Manager: npm
