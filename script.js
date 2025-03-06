window.onload = function () {
            function createRandomPromise(id) {
                const time = Math.random() * (3 - 1) + 1; // Random time between 1 and 3 seconds
                return new Promise(resolve => {
                    setTimeout(() => resolve({ id, time: time.toFixed(3) }), time * 1000);
                });
            }

            const output = document.getElementById("output");
            output.innerHTML = '<tr><td colspan="2">Loading...</td></tr>'; // Ensure "Loading..." is set initially

            const promises = [
                createRandomPromise(1),
                createRandomPromise(2),
                createRandomPromise(3)
            ];

            Promise.all(promises).then(results => {
                output.innerHTML = ""; // Remove the loading row
                results.forEach(result => {
                    const row = `<tr><td>Promise ${result.id}</td><td>${result.time}</td></tr>`;
                    output.innerHTML += row;
                });

                // Calculate total time (max time taken by any promise)
                const totalTime = Math.max(...results.map(r => parseFloat(r.time))).toFixed(3);
                output.innerHTML += `<tr><td><strong>Total</strong></td><td><strong>${totalTime}</strong></td></tr>`;
            });
        };