const practicalCode = {
    1: `# Practical no.1: Consumer Producer Problem

import threading
import time
# Shared Memory Variables
CAPACITY = 10
buffer = [-1 for _ in range(CAPACITY)]
in_index = 0
out_index = 0
# Declaring Semaphores
mutex = threading.Semaphore()
empty = threading.Semaphore(CAPACITY)
full = threading.Semaphore(0)
# Producer Thread Class
class Producer(threading.Thread):
    def run(self):
        global CAPACITY, buffer, in_index, out_index
        global mutex, empty, full
        items_produced = 0
        counter = 0
        while items_produced < 20:
            empty.acquire()
            mutex.acquire()
            counter += 1
            buffer[in_index] = counter
            in_index = (in_index + 1) % CAPACITY
            print("Producer produced:", counter)
            mutex.release()
            full.release()
            time.sleep(1)
            items_produced += 1
# Consumer Thread Class
class Consumer(threading.Thread):
    def run(self):
        global CAPACITY, buffer, in_index, out_index
        global mutex, empty, full
        items_consumed = 0
        while items_consumed < 20:
            full.acquire()
            mutex.acquire()
            item = buffer[out_index]
            out_index = (out_index + 1) % CAPACITY
            print("Consumer consumed item:", item)
            mutex.release()
            empty.release()
            time.sleep(2)
            items_consumed += 1
# Creating Threads
producer = Producer()
consumer = Consumer()
# Starting Threads
consumer.start()
producer.start()
# Waiting for threads to complete
producer.join()
consumer.join();`
};

function copyToClipboard(practicalNumber) {
    const code = practicalCode[practicalNumber];
    
    if (code) {
        navigator.clipboard.writeText(code)
            .then(() => {
                alert(`Practical ${practicalNumber} code copied to clipboard!`);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    } else {
        alert('No code available for this practical.');
    }
}

document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file && file.type === 'application/pdf') {
        const fileURL = URL.createObjectURL(file);
        document.getElementById('pdfViewer').src = fileURL;
    } else {
        alert('Please upload a valid PDF file.');
    }
});

