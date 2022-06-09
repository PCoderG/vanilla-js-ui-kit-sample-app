import { initializeDyteMeeting, addDyteMeetingToDyteClassMembers } from '../../scripts/util.js';

// Adds a <dyte-participant-tile /> When self joins the room
function roomJoinedListener(self, dyteMeeting) {
  const tile = document.createElement('dyte-participant-tile');
  const nameTag = document.createElement('dyte-name-tag');

  tile.appendChild(nameTag);
  
  const stage = document.getElementById('stage');
  
  nameTag.participant = self;
  nameTag.meeting = dyteMeeting;

  tile.participant = self;
  tile.id = 'self-tile';

  stage.appendChild(tile);
}

// Adds a <dyte-participant-tile /> When a particpant joins the room
function particpantJoinedListener(participant, dyteMeeting) {
  const tile = document.createElement('dyte-participant-tile');
  const nameTag = document.createElement('dyte-name-tag');

  tile.appendChild(nameTag);

  const stage = document.getElementById('stage');
  
  nameTag.participant = participant;
  nameTag.meeting = dyteMeeting;

  tile.participant = participant;
  tile.id = `participant-${participant.id}`;
  
  stage.appendChild(tile);
}

// Removes the <dyte-participant-tile /> associated with a leaving participant
function participantLeftListener(participant) {
  const tile = document.getElementById(`participant-${participant.id}`);
  if (tile) {
    tile.remove();
  }
}

// Removes the <dyte-participant-tile /> associated with self
function roomLeftListener() {
  const tile = document.getElementById(`self-tile`);
  if (tile) {
    tile.remove();
  }
}

const main = async () => {
  // Initializes a meeting.
  const dyteMeeting = await initializeDyteMeeting();

  // Add event listeners for particpants and self joining and leaving rooms to update
  // our UI

  dyteMeeting.self.on('roomJoined', () => roomJoinedListener(dyteMeeting.self, dyteMeeting));

  dyteMeeting.participants.active.on('participantJoined', (participant) => particpantJoinedListener(participant, dyteMeeting));

  dyteMeeting.participants.active.on('participantLeft', participantLeftListener);

  dyteMeeting.self.on('roomLeft', roomLeftListener);
 
  // Adds meeting to all dyte members
  addDyteMeetingToDyteClassMembers(document, dyteMeeting);
  
  // Joins room directly without a setup screen
  await dyteMeeting.joinRoom();

  // Disable loader
  document.getElementById('loader').style.display = 'none';
  document.getElementById('dyte-meeting-container').style.display = 'flex';
};
main();
