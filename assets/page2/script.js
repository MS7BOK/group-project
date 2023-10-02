// Handle form submission
document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Get the input value
    var inputValue = document.getElementById('textInput').value;
    
    // Display the input value in an alert
    alert('You entered: ' + inputValue);
});
