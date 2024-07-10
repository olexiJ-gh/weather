document.addEventListener('DOMContentLoaded', function () {
    function all_change() {
        const path_to_photo = {
            1: "./new_assets/clear.png",
            2: "./new_assets/drizzle.png",
            3: "./new_assets/mist.png",
            4: "./new_assets/rain.png",
            5: "./new_assets/snow.png",
            6: "./new_assets/wind.png",
            7: "./new_assets/clear.png"
        };

        const path_to_photo_src = document.getElementById('weather-icon')
        const random_photo = Math.floor(Math.random() * 7 + 1)

        path_to_photo_src.src = path_to_photo[random_photo]

        const temp_value = Math.floor(Math.random() * 38 + 1)
        const humidity_value = Math.floor(Math.random() * 100 + 1)
        const wind_value = Math.floor(Math.random() * 20 + 1)

        document.getElementById('temperature_celsius').innerHTML = temp_value + '°C'
        document.getElementById('humidity_value').innerHTML = humidity_value + '%'
        document.getElementById('wind_speed').innerHTML = wind_value + 'km/h'

        const input_value = document.getElementById('search-line');
        const rewrite_h1 = document.getElementById('city-h1');

        if (input_value.value !== '') {
            rewrite_h1.innerHTML = input_value.value
        }

    }
    const dialogWindowStyle = document.getElementById('dialog_window');

    document.querySelector('#close_form').onclick = function () {
        if (dialogWindowStyle.style.display === 'none') {
            dialogWindowStyle.showModal()
            dialogWindowStyle.style.display = 'flex';
        } else {
            dialogWindowStyle.style.display = 'none'
        }
    }

    let number = 0;
    const savedBlocks = JSON.parse(localStorage.getItem("blocks") || "[]");

    savedBlocks.forEach(block => createBlock(block));

    document.getElementById('submit').onclick = function () { // Імпорт елементів діалогового вікна
        number++;

        let city_form_name = document.getElementById('city_form_name');
        let temperature_dialog = document.getElementById('temperature');
        let humidity_dialog = document.getElementById('humidity');
        let wind_dialog = document.getElementById('wind');

        const weather_form = {
            city_name: city_form_name.value,
            temperature: temperature_dialog.value,
            humidity: humidity_dialog.value,
            wind_speed: wind_dialog.value
        }
        localStorage.setItem(`weather_${number}`, JSON.stringify(weather_form));
        dialogWindowStyle.style.display = 'none';


        createBlock(weather_form);
        savedBlocks.push(weather_form);
        localStorage.setItem("blocks", JSON.stringify(savedBlocks));
    }

    function createBlock(weather_form) {
        let city_form = document.getElementById('div_city_form');
        let create_element = document.createElement('div');
        let button_element = document.createElement('button');

        create_element.className = 'div_form';
        button_element.textContent = weather_form.city_name;
        button_element.className = 'form_city_name_button';
        city_form.style.background = 'none';
        create_element.appendChild(button_element);
        city_form.appendChild(create_element);

        button_element.onclick = (event) => {
            event.preventDefault()
            console.log(event.target)
            console.log(event.clientY + ":Y ", event.clientX + "X ")
            const path_to_photo = {
                1: "./new_assets/clear.png",
                2: "./new_assets/drizzle.png",
                3: "./new_assets/mist.png",
                4: "./new_assets/rain.png",
                5: "./new_assets/snow.png",
                6: "./new_assets/wind.png",
                7: "./new_assets/clear.png"
            };

            const path_to_photo_src = document.getElementById('weather-icon')
            const random_number_for_image = Math.floor(Math.random() * 7 + 1)

            path_to_photo_src.src = path_to_photo[random_number_for_image];
            document.getElementById('temperature_celsius').innerHTML = weather_form.temperature + "°C";
            document.getElementById('humidity_value').innerHTML = weather_form.humidity + "%";
            document.getElementById('wind_speed').innerHTML = weather_form.wind_speed + "m/s";
            document.getElementById('city-h1').textContent = weather_form.city_name;
        }
    }

    document.getElementById('add_city_img').onclick = function () {
        if (dialogWindowStyle.style.display === 'none') {
            dialogWindowStyle.style.display = 'block';


        }
        document.getElementById('submit').addEventListener('click', function () {
            document.getElementById('temperature').value = '';
            document.getElementById('city_form_name').value = '';
            document.getElementById('wind').value = '';
            document.getElementById('humidity').value = '';

        })
    }


    document.getElementById('search-button').onclick = all_change;
});
