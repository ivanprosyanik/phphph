'use strict';

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ9WHNbwVrtnzoVkGxq_c1A7bLwowJphw",
  authDomain: "phphph-ef72d.firebaseapp.com",
  databaseURL: "https://phphph-ef72d-default-rtdb.firebaseio.com",
  projectId: "phphph-ef72d",
  storageBucket: "phphph-ef72d.firebasestorage.app",
  messagingSenderId: "1023415324074",
  appId: "1:1023415324074:web:be6d0535c43f783e6e2fd3",
  measurementId: "G-NJH6C7C1JS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const linksRef = ref(database, 'links');


// Form and list
const inputLink = document.querySelector('.header__field--link');
const inputDescr = document.querySelector('.header__field--descr');
const contentList = document.querySelector('.list');
const headerForm = document.querySelector('.header__form');

// Add new link
headerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const link = inputLink.value;
  const descr = inputDescr.value;
  push(linksRef, { link, descr });
  headerForm.reset();
});

// Displays links
onValue(linksRef, (snapshot) => {
  contentList.innerHTML = '';
  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();
    const contentItem = `
      <li class="list__item">
        <article class="list__card card">
          <figure class="card__head">
            <img src="images/1.jpg" alt="Images" class="card__img">
          </figure>
          <div class="card__content">
            <p class='card__text'>${data.descr}</p>
          </div>
          <a href="${data.link}" class="card__link" target="_blank">Visit</a>
        </article>
      </li>`;
    contentList.insertAdjacentHTML('beforeend', contentItem);
  });
});
