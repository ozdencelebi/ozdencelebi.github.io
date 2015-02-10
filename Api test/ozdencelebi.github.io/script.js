
//        Musi vibe




var emotionsList =['sad', 'heartbroken', 'turnt-up', 'fucked-up', 'party', 'dance', 'dinnermode', 'chill', 'ove in the air', 'date-night', 'happy' , 'valentines-day', 'training', 'beastmode', 'hip-hop party', 'in love', 'first crush', 'rastafari', 'reggae', 'angry' ];


//   Initialize Soundcloud API
SC.initialize({
  client_id: 'a5b498feee2ab0ca8da4638a1e0944ea',
    
    
    //'5aa8e389ba4e24b6106af5159ab3e344',
    redirect_uri:"https://api.soundcloud.com/oauth2/token" 
});

// initiate auth popup
SC.connect(function() {
  SC.get('/me', function(me) { 
    alert('Hello, ' + me.username); 
  });
});

//Document ready

// $(document).ready() runs once the page DOM is ready for JavaScript
// to execute. A page can't be manipulated safely until the document is ready.
// Add click handlers to 'go' and 'random' buttons here.

$(document).ready(function () {
  var goButton = document.getElementById('search');
  goButton.addEventListener('click', searchClicked);

  var randomButton = document.getElementById('random');
  randomButton.addEventListener('click', randomClicked);


});


//  Play a song
// Play a track using SC.stream from Souncdloud SDK

function playOneTrack () {
  SC.stream('/tracks/17', function (sound) {
    sound.play();
  });
}



// Play a song for the user's wish
// The currently playing song
var currentSong;

//
//  'Search' button click handler
//
// 1. Get the user's mood from the form
// 2. Search Souncloud for a song for the mood
// 3. Update box #moodstatus   to dipsplay the mood

function searchClicked () {
  var vibe = $('#mood').val();
  updatebox(vibe);
  searchTracks(vibe);
}

//
// Search soundcloud tracks
//
// 1. Search soundcloud using the Soundcloud API to find a song that
// matches the user's mood.
// 2. Play the song
// 3. Update box #songtitle to display the song title
//
// * **mood**, the user's musicmood.
//
function searchTracks (vibe) {
  SC.get('/tracks', { q: vibe }, function (tracks) {
    var songs = tracks;
    var randomSongNumber = Math.floor(Math.random() * (songs.length - 1));
    var song = songs[randomSongNumber];
    playTrack(song.id);
    $('#songtitle').text(song.user.username + '' + song.title);
  });
}

//
//  Play a track
//
// Play a Soundcloud track. If there is already a song playing,
// stop that song first.
// * **trackid**, the ID of the track to play.
//
function playTrack (trackid) {
  if(currentSong){
    currentSong.stop();
  }
  SC.stream('/tracks/' + trackid, function (sound) {
    currentSong = sound;
    currentSong.play();
  });
}

//
// # Update Box
//
// Updates the header text to show the user's mood.
// (Optional: change the box's color)
//
// * **mood**, the user's mood
//
function updatebox (vibe) {
  $('#moodstatus').text('It sounds like you are in a ' + vibe +  ' mood!!');
  changeColor(getColor(mood));
}


//      Randomization
// # 'Random' button click handler
// Pick a mood at random from moodList and find a track for that mood.

function randomClicked () {
  var randomMusicVibe = randomMood();
  updatebox(randomMusicVibe);
  searchTracks(randomMusicVibe);
}


// # Random Mood

// Returns a random mood from moodList

function randomMood () {
  var randomNumber = Math.floor(Math.random() * (emotionsList.length - 1));
  return emotionsList[randomNumber];
}


// 1. Change the color of the box to fit the given mood.
//
// 2. Add a typeahead to the input field that shows the moods in our mood array.
//

//
// 1. Change color
//
// Add to updatebox: changeColor(getColor(mood));
//

// Map a few of our moods to 'happy' or 'sad'
var emotionsArray = {
  'happy': 'happy',
  'joy': 'happy',
  'excited': 'happy',
  'sweet': 'happy',
  'sad': 'sad',
  'worried': 'sad',
  'scared': 'sad',
  'afraid': 'sad'
};

// Map 'happy' and 'sad' to some colors
var colorArray = {
  'happy': [' ', 'FFFF99', 'FF33CC', '99FFCC', '33FFFF'],
  'sad':['808080', 'A52A2A', '8B0000', '330066']
};

//
// # Change the color of the box
//
// * **color**, the color to change to
//
function changeColor (color) {
  $('.box').css('background-color', color);
}

//
// # Get the mood color
//
// If our emotionsArray contains the given mood, return the right color.
// Otherwise, return a random color.
//
// * **mood**, the user's mood
//
function getColor (randomMusicVibe) {
  var color = '';
  if (emotionsArray[randomMusicVibe]) {
    var feeling = emotionsArray[mood];
    var listLength = colorArray[feeling].length;
    var randomNumber = Math.floor(Math.random() * (listLength - 1));
    return '#' + colorArray[feeling][randomNumber];
  } else {
    return getRandomColor();
  }
}



// Returns a random color hex code.
function getRandomColor () {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

