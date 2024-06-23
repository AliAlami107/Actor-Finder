document.getElementById('private-btn').addEventListener('click', function() {
    document.getElementById('private-section').classList.remove('hidden');
    document.getElementById('agency-section').classList.add('hidden');
});

document.getElementById('agency-btn').addEventListener('click', function() {
    document.getElementById('agency-section').classList.remove('hidden');
    document.getElementById('private-section').classList.add('hidden');
});

document.getElementById('actor-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const photo = document.getElementById('photo').files[0];
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const race = document.getElementById('race').value;
    const eyeColor = document.getElementById('eyeColor').value;

    if (photo) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoURL = e.target.result;
            saveProfile(photoURL, name, age, gender, height, race, eyeColor);
            alert("Profile uploaded successfully!");
        }
        reader.readAsDataURL(photo);
    }
});

let profiles = [];

function saveProfile(photoURL, name, age, gender, height, race, eyeColor) {
    profiles.push({
        photoURL,
        name,
        age,
        gender,
        height,
        race,
        eyeColor
    });
}

document.getElementById('filter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    filterProfiles();
});

function filterProfiles() {
    const ageMin = document.getElementById('filter-age-min').value;
    const ageMax = document.getElementById('filter-age-max').value;
    const gender = document.getElementById('filter-gender').value;
    const heightMin = document.getElementById('filter-height-min').value;
    const heightMax = document.getElementById('filter-height-max').value;
    const race = document.getElementById('filter-race').value.toLowerCase();
    const eyeColor = document.getElementById('filter-eyeColor').value.toLowerCase();

    const filteredProfiles = profiles.filter(profile => {
        return (!ageMin || profile.age >= ageMin) &&
               (!ageMax || profile.age <= ageMax) &&
               (!gender || profile.gender === gender) &&
               (!heightMin || profile.height >= heightMin) &&
               (!heightMax || profile.height <= heightMax) &&
               (!race || profile.race.toLowerCase().includes(race)) &&
               (!eyeColor || profile.eyeColor.toLowerCase().includes(eyeColor));
    });

    displayProfiles(filteredProfiles);
}

function displayProfiles(filteredProfiles) {
    const profilesContainer = document.getElementById('profiles');
    profilesContainer.innerHTML = '';

    filteredProfiles.forEach(profile => {
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');

        const img = document.createElement('img');
        img.src = profile.photoURL;
        img.alt = `${profile.name}'s photo`;
        img.width = 100;
        img.height = 100;

        const info = document.createElement('div');
        info.innerHTML = `
            <p><strong>Name:</strong> ${profile.name}</p>
            <p><strong>Age:</strong> ${profile.age}</p>
            <p><strong>Gender:</strong> ${profile.gender}</p>
            <p><strong>Height:</strong> ${profile.height} cm</p>
            <p><strong>Race:</strong> ${profile.race}</p>
            <p><strong>Eye Color:</strong> ${profile.eyeColor}</p>
        `;

        profileDiv.appendChild(img);
        profileDiv.appendChild(info);

        profilesContainer.appendChild(profileDiv);
    });
}
