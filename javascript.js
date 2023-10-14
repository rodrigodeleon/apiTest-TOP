const img = document.querySelector('img');

const searchButton = document.querySelector('#searchButton');
searchButton.addEventListener('click', () => {
  const searchBar = document.querySelector('#searchBar');
  loadGiffAsync(searchBar.value);
});

function loadGiff(searchWord) {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=YFXsGq81CZMy9iZvkrWUurW2bBxkFd0w&s=${searchWord}`,
    { mode: 'cors' }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      if (response.data.length === 0 && response.meta.status === 200)
        console.log(`Load Failed: Couldnt find Giff`);
      else {
        img.src = response.data.images.original.url;
      }
    });
}

async function loadGiffAsync(searchWord) {
  try {
    const getGiffResponse = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=YFXsGq81CZMy9iZvkrWUurW2bBxkFd0w&s=${searchWord}`,
      { mode: 'cors' }
    );
    const giffPromise = await getGiffResponse.json();
    if (giffPromise.data.length === 0 && giffPromise.meta.status === 200)
      console.log(`Load Failed: Couldnt find Giff`);
    else {
      img.src = giffPromise.data.images.original.url;
    }
  } catch (error) {
    console.log('something failed: ' + error);
  }
}
