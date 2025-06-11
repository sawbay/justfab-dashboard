import axios from 'axios';


export default async ({ req, res, log, error }) => {
  log(`path: ${req.path}`);
  log(`userid: ${req.headers['x-appwrite-user-id']}`);
  
  try {
    const axiosRes = await axios.request({
      method: req.method,
      baseURL: process.env.BACKEND_URL,
      url: req.path,
      headers: {
        'x-appwrite-key': req.headers['x-appwrite-key'],
        'x-appwrite-user-id': req.headers['x-appwrite-user-id'],
      },
      params: req.query,
      data: req.body,
    });

    if (axiosRes.status == 200) {
      return res.json({
        success: true,
        data: axiosRes.data,
      });
    } else {
      return res.json({
        success: false,
        error: axiosRes.data,
      });
    }
  } catch (e) {
    error(e);
    return res.json({
      success: false,
      error: e.response?.data || e.message,
    });
  }
}
