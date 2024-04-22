export default function createUUID() {
  // Get the current time in milliseconds since the Unix epoch.
  var dt = new Date().getTime();
  // Replace the placeholders in the UUID template with random hexadecimal characters.
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // Generate a random hexadecimal digit.
    var r = (dt + Math.random() * 16) % 16 | 0;
    // Update dt to simulate passage of time for the next random character.
    dt = Math.floor(dt / 16);
    // Replace 'x' with a random digit and 'y' with a specific digit (4 for UUID version 4).
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  // Return the generated UUID.
  return uuid;
}