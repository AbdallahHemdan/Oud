import axios from 'axios'
export function addToQueue(tracks, length){
    axios.post('http://localhost:3000/queue/', {
            tracks : tracks,
            total : length
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        console.log('queue called');
};

export function pause(){
    axios.post('http://localhost:3000/player/pause/',)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    console.log('pause called');
};
export function resume(){
    axios.post('http://localhost:3000/player/play/',)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    console.log('resume called');
}