//axios vs fetch

//fetch is a built-in function in JavaScript that allows you to make HTTP requests. It returns a promise that resolves to the response of the request. You can use it to get data from an API, send data to a server, or perform any other type of HTTP request.

// function main(){
//     fetch("https://sum-server.100xdevs.com/todos")
//     .then(async(response) =>{
//         const json=await response.json();
//         console.log(json.todos.length);
//         //await response.text() --- if you want to get the response as text
//     });
// }

// or

// async function main(){
//     const response=await fetch("https://sum-server.100xdevs.com/todos")
//     const json=await response.json();
//     console.log(json.todos.length);
// }

const axios=require("axios");

//get request  --> axios.get(url,config)
async function main(){
    const response=await axios("https://sum-server.100xdevs.com/todos");
    console.log(response.data.todos.length);
}

//post request -->axios.post(url,body,config)
async function main(){
    const response=await axios.post(
        "https://httpdump.app/c8ad7fcb-c9e7-44d9-8660-9945253fdb34?a=b",
        {
        username: "druv",
        },
        {
            headers: {
                Authorization: "Bearer 123",
            },
        },
    );
    console.log(response.data);
}
//or

// async function main(){
//     const response=await axios(
//         {
//             url:"https://httpdump.app/c8ad7fcb-c9e7-44d9-8660-9945253fdb34?a=b",
//             method: "POST",  similar for put,patch,delete
//             headers: {
//                 Authorization: "Bearer 123",
//             },
//             body: {
//                 username: "druv"
//             }
//         },
//     );
//     console.log(response.data);
// }

main();

