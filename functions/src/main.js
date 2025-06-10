import axios from 'axios';


export default async ({ req, res, log, error }) => {
  log(`path: ${req.path}`);
  log(`userid: ${req.headers['x-appwrite-user-id']}`);
  
  try {
    const axiosRes = await axios.request({
      method: req.method,
      baseURL: process.env.SMS_BACKEND_URL,
      url: req.path,
      headers: {
        'x-appwrite-key': req.headers['x-appwrite-key'],
        'x-appwrite-user-id': req.headers['x-appwrite-user-id'],
      },
      params: req.query,
      data: req.body,
    });

    return res.json({
      success: true,
      data: axiosRes.data,
    });
  } catch (e) {
    error(`${e}`);
    return res.json({
      success: false,
      error: e.response?.data?.error || e.message,
    });
  }
}

// const response = await axios.get('https://api.example.com/data');
// console.log(response.data);

// // You can use the Appwrite SDK to interact with other services
// // For this example, we're using the Users service
// const client = new Client()
//   .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
//   .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
//   .setKey(req.headers['x-appwrite-key'] ?? '');
// const users = new Users(client);

// try {
//   const response = await users.list();
//   // Log messages and errors to the Appwrite Console
//   // These logs won't be seen by your end users
//   log(`Total users: ${response.total}`);
// } catch (err) {
//   error("Could not list users: " + err.message);
// }

// // The req object contains the request data
// if (req.path === "/ping") {
//   // Use res object to respond with text(), json(), or binary()
//   // Don't forget to return a response!
//   return res.text("Pong");
// }

// return res.json({
//   motto: "Build like a team of hundreds_",
//   learn: "https://appwrite.io/docs",
//   connect: "https://appwrite.io/discord",
//   getInspired: "https://builtwith.appwrite.io",
// });
// };
