// document.addEventListener('DOMContentLoaded', () => {

// })
const dogsUrl = 'http://localhost:3000/dogs'
getDogs();
function getDogs()
{
    fetch(dogsUrl)
    .then(res => res.json())
    .then(displayDogs);
}


const dogTable = document.getElementById('table-body');
function displayDogs(dogs)
{
    dogTable.innerHTML = '';
    dogs.forEach(displayDog);
}

function displayDog(dog)
{
    const dogRow = document.createElement('tr');
    dogRow.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>Edit</button></td>
    `
    const editDogButton = dogRow.querySelector('button');
    editDogButton.addEventListener('click', () => getEditForm(dog));
    dogTable.appendChild(dogRow);
}

function getEditForm(dog)
{
    const dogForm = document.getElementById('dog-form');
    dogForm.name.value = dog.name;
    dogForm.breed.value = dog.breed;
    dogForm.sex.value = dog.sex;
    
    dogForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const sex = event.target.sex.value;
        const breed = event.target.breed.value;
        const updatedDog = { name, sex, breed };
        
        const dogUrl = `${dogsUrl}/${dog.id}`;
        fetch(dogUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                Accept:'application/json'
            },
            body: JSON.stringify(updatedDog)
        })
        .then(res => res.json())
        .then(getDogs)
    });
}
