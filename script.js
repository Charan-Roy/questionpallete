function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    let toggleButton = document.getElementById("toggle-btn");
    let mainContent = document.querySelector(".main-content");
    let cardContainer = document.querySelector(".card1-container");
    let footer = document.querySelector("footer");

    // Toggle the 'active' class on the sidebar
    sidebar.classList.toggle("active");

    // Change the button icon depending on the sidebar's state
    if (sidebar.classList.contains("active")) {
        toggleButton.innerHTML = "✖"; // Close icon when sidebar is open
        mainContent.style.marginLeft = "250px"; // Adjust margin to fit the sidebar
        mainContent.style.width = "80%"; // Shrink main content width
        cardContainer.style.marginLeft = "250px";
        cardContainer.style.width = "80%";
        footer.style.marginLeft = "250px"; // Adjust footer margin
        footer.style.width = "80%"; // Shrink footer width
    } else {
        toggleButton.innerHTML = "☰"; // Hamburger icon when sidebar is closed
        mainContent.style.marginLeft = "0"; // Reset margin when sidebar is closed
        mainContent.style.width = "100%"; // Expand main content width
        cardContainer.style.marginLeft = "0";
        cardContainer.style.width = "100%";
        footer.style.marginLeft = "0"; // Reset footer margin
        footer.style.width = "100%"; // Expand footer width
    }
}
let testData = {};


function generateQuestionInputs() {
 const numQuestions = document.getElementById('numQuestions').value;
 const questionsContainer = document.getElementById('questionsContainer');
 questionsContainer.innerHTML = ''; // Clear any existing questions
 
 if (numQuestions && numQuestions > 0) {
     // Generate question inputs for the number of questions specified
     for (let i = 1; i <= numQuestions; i++) {
         const questionBlock = `
             <h4 >Question ${i}</h4>
             <div style="display: flex; textwrap:nowrap; flex-direction: column; gap: 12px;">
                <textarea id="myTextArea" name="myTextArea" rows="4" cols="50" style="width: 100%; height: 70px;"></textarea>

               
                   
            </div> 
        </div>
            <div style="margin-bottom: 10px;"></div>
            <div style="text-wrap: nowrap; display: grid; grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, auto); gap:10px; margin-bottom: 30px;">
                <div>
                
                <label for="option1_${i}">Option1:</label>
                <input type="text" id="option1_${i}" name="option1_${i}" required><br><br>
                
                
               <label for="option2_${i}">Option2:</label>
               <input type="text" id="option2_${i}" name="option2_${i}" required><br><br>
               
               
               <label for="option3_${i}">Option3:</label>
               <input type="text" id="option3_${i}" name="option3_${i}" required><br><br>

               
               <label for="option4_${i}">Option4:</label>
               <input type="text" id="option4_${i}" name="option4_${i}" required><br>

               <div style="display: flex; textwrap:nowrap; flex-direction: column; gap: 10px; margin-top: 20px;">

                    <label for="correct_${i}">Correct Option(1-4):</label>
                    <input type="number" id="correct_${i}" name="correct_${i}" min="1" max="4" required>

                    <label for="hint_${i}">Hint:</label>
                    <input type="text" id="hint_${i}" name="hint_${i}"><br><br>
               </div>
            `;
              questionsContainer.innerHTML += questionBlock;
     }
 } else {
     alert("Please enter a valid number of questions.");
 }
}

// Handling form submission and saving the test
document.getElementById('generateTestForm').addEventListener('submit', function(event) {
     event.preventDefault();
     
     const formData = new FormData(event.target);
     const numQuestions = formData.get('numQuestions');
     
     // Gather all the test data
     const testData = {
         subject: formData.get('subject'),
         numQuestions: numQuestions,
         time: formData.get('time'),
         questions: []
     };

     for (let i = 1; i <= numQuestions; i++) {
         const questionData = {
             question: formData.get(question${i}),
             options: [
                 formData.get(option1_${i}),
                 formData.get(option2_${i}),
                 formData.get(option3_${i}),
                 formData.get(option4_${i})
             ],
             correct: formData.get(correct_${i}),
             hint: formData.get(hint_${i})
         };
         testData.questions.push(questionData);
     }

     // Save the test data and subject/time in localStorage
     localStorage.setItem('testData', JSON.stringify(testData));
     localStorage.setItem('testSubject', testData.subject);
     localStorage.setItem('testTime', testData.time);

     alert('Test saved successfully!');

     // Redirect to the test page
     window.location.href = 'test.html';
 });