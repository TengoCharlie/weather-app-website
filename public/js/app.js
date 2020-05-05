console.log("Client side javascript file is loading");



const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const one = document.getElementById('one');
const two = document.getElementById('two');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let address = input.value;
    one.innerText = "loading....";
    two.innerText = "";
    fetch(`http://localhost:3000/weather?address=${address}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                return one.innerText = data.error;
            }
            one.innerText = data.location;
            two.innerText = data.forcast;
            // console.log(data.location);
            // console.log(data.forcast);
        });
    });
});