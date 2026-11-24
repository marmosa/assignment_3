console.log(songs);
const songList = document.querySelector("#song-list");
const searchInput = document.querySelector("#search-input");
const genreFilter = document.querySelector("#genre-filter");
const sortSelect = document.querySelector("#sort-select");
const playlistElement = document.querySelector("#playlist");
const totalDurationElement = document.querySelector("#total-duration");
function formatDuration(seconds) {
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = seconds % 60;
    return `${minutes} :${String(remainingSeconds) .padStart(2, "0")}
    `;
}
const playlist = JSON.parse(localStorage.getItem("playlist")) || [];
const genres = [...new Set(songs.map((song) => song.genre))];
genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
});
function renderSongs(songArray) {
    songList.innerHTML = "";
    if (songArray.length === 0) {
        songList.textContent = "No songs found";
        return;
    }
songArray.forEach((song) => {
    const songItem = document.createElement("div");
    songItem.classList.add("song-item");
songItem.addEventListener("click", () => {
    if (!playlist.some((item) => item.id === song.id)) {
        playlist.push(song);
    }
    renderPlaylist();
    console.log(playlist);
});
songItem.innerHTML = `
    <div class="song-item__info">
        <strong>${song.title}</strong>
        <span>${song.artist} · ${song.genre}</span>
    </div>
    <span class="song-item__duration">
        ${formatDuration(song.duration)}</span>`;
        songList.appendChild(songItem);
});
}
renderSongs(songs);
sortSelect.addEventListener("change", () => {
    const sortedSongs = songs.filter((song) => {
    const searchText = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;

    const matchesSearch =
        song.title.toLowerCase().includes(searchText) ||
        song.artist.toLowerCase().includes(searchText);

    const matchesGenre =
        selectedGenre === "all" || song.genre === selectedGenre;

    return matchesSearch && matchesGenre;
});
if (sortSelect.value === "title") {
    sortedSongs.sort((a, b) => a.title.localeCompare(b.title));
} else if (sortSelect.value === "artist") {
    sortedSongs.sort((a, b) => a.artist.localeCompare(b.artist));
} else if (sortSelect.value === "duration") {
    sortedSongs.sort((a, b) => a.duration - b.duration);
}
    renderSongs(sortedSongs);
});
genreFilter.addEventListener("change", () => {
    const selectedGenre = genreFilter.value;
    const searchText = searchInput.value.toLowerCase();
   const filteredSongs = songs.filter((song) => {
    const matchesSearch =
        song.title.toLowerCase().includes(searchText) ||
        song.artist.toLowerCase().includes(searchText);

    const matchesGenre =
        selectedGenre === "all" || song.genre === selectedGenre;

    return matchesSearch && matchesGenre;
});
if (sortSelect.value === "title") {
    filteredSongs.sort((a, b) => a.title.localeCompare(b.title));
} else if (sortSelect.value === "artist") {
    filteredSongs.sort((a, b) => a.artist.localeCompare(b.artist));
} else if (sortSelect.value === "duration") {
    filteredSongs.sort((a, b) => a.duration - b.duration);
}
    renderSongs(filteredSongs);
});
searchInput.addEventListener("input" , () => {
    const searchText = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;
const filteredSongs = songs.filter((song) => {
    const matchesSearch =
        song.title.toLowerCase().includes(searchText) ||
        song.artist.toLowerCase().includes(searchText);

    const matchesGenre =
        selectedGenre === "all" || song.genre === selectedGenre;

    return matchesSearch && matchesGenre;
});
if (sortSelect.value === "title") {
    filteredSongs.sort((a, b) => a.title.localeCompare(b.title));
} else if (sortSelect.value === "artist") {
    filteredSongs.sort((a, b) => a.artist.localeCompare(b.artist));
} else if (sortSelect.value === "duration") {
    filteredSongs.sort((a, b) => a.duration - b.duration);
}
    renderSongs(filteredSongs);
});
function renderPlaylist() {
    playlistElement.innerHTML = "";
    if (playlist.length === 0) {
        playlistElement.textContent = "Your playlist is empty";
        
    }
    playlist.forEach((song) => {
        const playlistItem = document.createElement("p");
        playlistItem.classList.add("playlist-item");
        playlistItem.textContent = `${song.title} - ${song.artist}`;
        playlistItem.setAttribute("title" , "Click to remove song");
        const removeButton = document.createElement("button");
        removeButton.textContent = "×";
        removeButton.classList.add("remove-button");
        removeButton.setAttribute("aria-label", `Remove ${song.title}`);
        playlistItem.appendChild(removeButton);
        removeButton.addEventListener("click", () => {
    const index = playlist.indexOf(song);
    playlist.splice(index, 1);
    renderPlaylist();
});

playlistElement.appendChild(playlistItem);
});

const totalSeconds = playlist.reduce((total, song) => {
    return total + song.duration;
}, 0);
    totalDurationElement.textContent = formatDuration(totalSeconds);
    localStorage.setItem("playlist", JSON.stringify(playlist));
}
renderPlaylist();