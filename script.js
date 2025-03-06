document.addEventListener("DOMContentLoaded", function () {
    let tbody = document.getElementById("output");

    // Show initial loading row
    tbody.innerHTML = <tr id="loading"><td colspan="2">Loading...</td></tr>;

    function createPromise(index) {
        return new Promise((resolve) => {
            let time = (Math.random() * (3 - 1) + 1).toFixed(3); // Random time between 1-3 seconds
            setTimeout(() => resolve({ index, time }), time * 1000);
        });
    }

    // Create three promises
    let promises = [createPromise(1), createPromise(2), createPromise(3)];

    // Capture start time
    let startTime = performance.now();

    Promise.all(promises).then(results => {
        let endTime = performance.now();
        let totalTime = ((endTime - startTime) / 1000).toFixed(3); // Total execution time

        tbody.innerHTML = ""; // Clear loading row

        // Sort results by index for better order
        results.sort((a, b) => a.index - b.index).forEach(result => {
            let row = `<tr>
                <td>Promise ${result.index}</td>
                <td>${result.time}</td>
            </tr>`;
            tbody.innerHTML += row;
        });

        // Add total time row
        tbody.innerHTML += `<tr>
            <td><strong>Total</strong></td>
            <td><strong>${totalTime}</strong></td>
        </tr>`;
    });
});