export default {
    get: jest.fn(()=>{return Promise.resolve(
      {
        "id": "1",
        "album_type": "Rap",
        "artists": [
          {
            "id": "5",
            "name": "حمزة نمرة",
            "type": "Shaaby",
            "image": "string"
          },
          {
            "id": "1",
            "name": "wegz",
            "type": "Shaaby",
            "image": "string"
          }
        ],
        "genres": [
          "shaaby"
        ],
        "image": "https://i.scdn.co/image/ab67616d0000b273ef029742aa2f7342b3b5daaf",
        "name": "Insan",
        "release_date": "2020-03-07",
        "tracks": {
          "items": [
            {
              "id": "19",
              "name": "إنسان",
              "artists": [
                {
                  "id": "5",
                  "name": "حمزة نمرة",
                  "type": "shaaby",
                  "image": "string"
                },
                {
                  "id": "2",
                  "name": "Sardeena",
                  "type": "Shaaby",
                  "image": "string"
                }
              ],
              "albumId": "1",
              "type": "Jazz",
              "audioUrl": "www.Facebook.com"
            },
            {
              "id": "20",
              "name": "سلاح التلميذ",
              "artists": [
                {
                  "id": "3",
                  "name": "ًWegz el wench",
                  "type": "Trap",
                  "image": "string"
                },
                {
                  "id": "4",
                  "name": "Amr Diab",
                  "type": "farafeery",
                  "image": "string"
                }
              ],
              "albumId": "1",
              "type": "Trap",
              "audioUrl": "www.facebook.com"
            },
            {
              "id": "22",
              "name": "سلاح التلميذ",
              "artists": [
                {
                  "id": "3",
                  "name": "ًWegz el wench",
                  "type": "Trap",
                  "image": "string"
                },
                {
                  "id": "4",
                  "name": "Amr Diab",
                  "type": "farafeery",
                  "image": "string"
                }
              ],
              "albumId": "1",
              "type": "Trap",
              "audioUrl": "www.facebook.com"
            }],
          },
          "type": "string",
          "released": true
        }
    )})
};