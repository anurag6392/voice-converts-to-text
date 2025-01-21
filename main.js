const texts = document.querySelector('.texts');

// Check if SpeechRecognition is supported by the browser
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p'); // Initial paragraph for results

// Event listener for speech recognition results
recognition.addEventListener('result', (e) => {
    const text = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    // Update the current speech text in the paragraph
    p.innerText = text;
    texts.appendChild(p);  // Append the paragraph to the container

    //function to speak a text response
    function speak(text){
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }

    // Check if the result is final (user has finished speaking)
    if (e.results[0].isFinal) {
        // in your command respone section
        if (text.includes('what is your name') || text.includes("what's your name")) {
            p = document.createElement('p');  // Create a new paragraph for the response
            p.classList.add('replay');
            p.innerText = 'My name is Siri, and yours?'; // speak the response
            texts.appendChild(p);
        }

        // Respond to "Open my Youtube channel"
        if (text.toLowerCase().includes('open my youtube')) {
            p = document.createElement('p');  // Create a new paragraph for the response
            p.classList.add('replay');
            p.innerText = 'Opening your Youtube...';
            texts.appendChild(p);

            location.href = 'https://youtube.com'
        }

        // Optionally, you can add more responses to other commands here...

        // Create a new paragraph for the next speech input (to ensure the next input is displayed clearly)
        p = document.createElement('p');
    }

    // Optional: Log the speech recognition event for debugging
    // console.log(e);
});

// Automatically restart recognition after it ends (keeps listening for new speech)
recognition.addEventListener('end', () => {
    recognition.start();  // Restart recognition for continuous listening
});

// Start recognition immediately on page load
recognition.start();
