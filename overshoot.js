import { RealtimeVision } from '@overshoot/sdk'
 
// Helper: Save PNGs to a folder
function savePngToDisk(base64Png, idx) {
  const fs = require('fs');
  const path = require('path');
  const folder = path.join(__dirname, 'overshoot-frames');
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  const filePath = path.join(folder, `frame_${idx}.png`);
  const data = base64Png.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync(filePath, data, 'base64');
  console.log('Saved:', filePath);
}
 
let frameIdx = 0;
 
const vision = new RealtimeVision({
  apiUrl: 'https://cluster1.overshoot.ai/api/v0.2',
  apiKey: process.env.OVERSHOOT_API_KEY,
  prompt: 'Read any visible text',
  onResult: (result) => {
    if (result.png) {
      savePngToDisk(result.png, frameIdx++);
    }
    if (result.result) {
      console.log('Vision result:', result.result);
    }
  }
})
 
async function runScreenRecordingTest() {
  await vision.start(); // starts the camera and begins processing
  // Record for 10 seconds
  await new Promise(r => setTimeout(r, 10000));
  await vision.stop();
  console.log('Screen recording and PNG saving complete.');
}
 
runScreenRecordingTest();