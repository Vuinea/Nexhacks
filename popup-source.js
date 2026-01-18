import { RealtimeVision } from '@overshoot/sdk';

const message = document.querySelector('#message');

document.addEventListener('DOMContentLoaded', () => {
    // chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
    //     const activeTab = tabs[0];
    //     const activeTabId = activeTab.id;
    //     return chrome.scripting.executeScript({
    //         target: { tabId: activeTabId },
    //         // injectImmediately: true,  // uncomment this to make it execute straight away, other wise it will wait for document_idle
    //         func: DOMtoString,
    //         // args: ['body']  // you can use this to target what element to get the html for
    //     });

    // }).then(function (results) {
    //     message.innerText = results[0].result;
    // }).catch(function (error) {
    //     message.innerText = 'There was an error injecting script : \n' + error.message;
    // });
    
    
    // const startBtn = document.getElementById('greetBtn');
    // const outputEl = document.getElementById('output');

    // // 1. Define the Vision instance (Keep it ready)
    // // Note: We don't start it yet.
    // let vision = null;

    // if (startBtn) {
    //     startBtn.addEventListener('click', async () => {
    //         try {
    //             startBtn.innerText = "Selecting Tab...";

    //             // 2. Ask the user to select the tab they want to read
    //             // 'displaySurface: browser' encourages the browser to offer the current tab first
    //             const screenStream = await navigator.mediaDevices.getDisplayMedia({
    //                 video: { 
    //                     displaySurface: 'browser' 
    //                 },
    //                 audio: false
    //             });

    //             startBtn.innerText = "Starting Vision...";

    //             // 3. Initialize Overshoot with this specific stream
    //             // (Check the Overshoot docs: they likely accept a 'stream' or 'videoElement' param)
    //             vision = new RealtimeVision({
    //                 apiUrl: 'https://cluster1.overshoot.ai/api/v0.2',
    //                 apiKey: process.env.API_KEY,
    //                 prompt: 'Read the main content of this webpage live as I scroll',
                    
    //                 // CRITICAL: Pass the screen stream here!
    //                 // If the SDK doesn't support 'stream' directly, 
    //                 // you might need to attach it to a hidden <video> element and pass that.
    //                 input: screenStream, 
                    
    //                 onResult: (result) => {
    //                     console.log("Read:", result.result);
    //                     if (outputEl) outputEl.innerText = result.result;
    //                 }
    //             });

    //             await vision.start();
    //             startBtn.innerText = "Stop Reading";

    //             // 4. Handle when user stops sharing via the Chrome bar
    //             screenStream.getVideoTracks()[0].onended = () => {
    //                 vision.stop();
    //                 startBtn.innerText = "Start Reading";
    //             };

    //         } catch (err) {
    //             console.error("Error:", err);
    //             startBtn.innerText = "Failed (See Console)";
    //         }
    //    });
    //}
});