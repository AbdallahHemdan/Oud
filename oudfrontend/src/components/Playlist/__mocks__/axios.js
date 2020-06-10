export default {
    get: jest.fn(()=>{return Promise.resolve({
        "id": "2",
          "ownerName": "Jazz",
          "owner": "Ahmed Walid",
          "collaborative": true,
          "description": "Best music I have ever listened to",
          "followersCount": 100,
          "image":"https://img1.wsimg.com/isteam/ip/8203b8d1-fa5f-419d-a67f-e7d2656bf2ed/MEK_9025-1111.jpg",
          "public": true,
          "type": "trap",
          "name":"ahmed",
          "displayName":"ajmed",
          "tracks": [
            {
              "id": "21",
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
            }
          ]
      })}),
      post: jest.fn(()=>{return Promise.resolve({status: "204", message: "success" })}),
      put: jest.fn(()=>{return Promise.resolve({status: "204", message: "success" })}),
      delete: jest.fn(()=>{return Promise.resolve({status: "204", message: "success" })})

};