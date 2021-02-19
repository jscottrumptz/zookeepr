const $animalForm = document.querySelector('#animal-form');

const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };

  // Because the request is coming from the server, we don't have to specify the full URL.
  fetch('/api/animals', {
    // First and most importantly, we have to actually specify what type of request 
    // it is and set the method to POST. This will allow the request to make it to the 
    // proper endpoint in our server.
    method: 'POST',
    //Next, we have to tell the request what type of data we're looking to send and then 
    // actually provide the data. We set the headers property to inform the request that 
    // this is going to be JSON data. That way, we can add stringified JSON data for our 
    // animalObject to the body property of the request.
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(animalObject)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      alert('Error: ' + response.statusText);
    })
    .then(postResponse => {
      console.log(postResponse);
      alert('Thank you for adding an animal!');
    });
};

$animalForm.addEventListener('submit', handleAnimalFormSubmit);
