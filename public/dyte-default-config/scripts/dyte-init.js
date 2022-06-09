import { initializeDyteMeeting, addDyteMeetingToDyteClassMembers } from '../../scripts/util.js';

const init = async () => {
  // Initializes a meeting.
  const dyteMeeting = await initializeDyteMeeting();

  // Adds meeting to all dyte members
  // (In this case just the element <dyte-meeting />).
  addDyteMeetingToDyteClassMembers(document, dyteMeeting);
};
init();
