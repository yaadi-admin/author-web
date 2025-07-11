// worker.js
self.onmessage = function (event) {
  const { dataArray, bars } = event.data;

  const aggregatedData = new Uint8Array(bars);
  const binsPerBar = dataArray.length / bars;

  // Aggregate the frequency bins into bars
  for (let i = 0; i < bars; i++) {
    let sum = 0;
    for (let j = 0; j < binsPerBar; j++) {
      sum += dataArray[i * binsPerBar + j];
    }
    aggregatedData[i] = sum / binsPerBar;
  }

  // Post the aggregated data back to the main thread
  postMessage(aggregatedData);
};