module.exports = {
    isZVideoUrl: (url) => {
        return /https:\/\/www\.zhihu\.com\/zvideo/.test(url)
    },

    getPlayUrl: (zVideoUrl) => {
        var myHeaders = new Headers();
        myHeaders.append("Accept-Encoding", "gzip, deflate, br");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Connection", "keep-alive");
        myHeaders.append("DNT", "1");
        myHeaders.append("Origin", "https://stellate.co");
        myHeaders.append("stellate-dashboard-token", "3b524627829e3d5a0b4c357fbc687b9504a4cfe85cd9f1e2100e497124c8598f");

        var raw = JSON.stringify({
            "query": "# Write your query or mutation here\nquery ExampleQuery($zvideoUrl: String!) {\n  getVideoInfoByUrl(zvideoUrl: $zvideoUrl) {\n    playUrl\n  }\n}\n",
            "variables": {
                "zvideoUrl": zVideoUrl
            }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch("https://graphcdn.pa-ca.me", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                return result.data.getVideoInfoByUrl.playUrl;
            })
            .catch(error => console.log('error', error));
    }
}