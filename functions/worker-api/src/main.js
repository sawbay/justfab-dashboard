export default async ({ req, res, log, error }) => {
  log(`path: ${req.path}`);
  log(`userid: ${req.headers['x-appwrite-user-id']}`);

  const url = new URL(req.path, process.env.BACKEND_URL);
  if (req.query) {
    Object.entries(req.query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  try {
    const fetchRes = await fetch(url.toString(), {
      method: req.method,
      headers: {
        'x-appwrite-key': req.headers['x-appwrite-key'],
        'x-appwrite-user-id': req.headers['x-appwrite-user-id'],
        'Content-Type': 'application/json',
      },
      body: req.body ? JSON.stringify(req.body) : undefined,
    });

    const data = await fetchRes.json().catch(() => null);
    log(data);

    if (fetchRes.ok) {
      return res.json({
        success: true,
        data,
      });
    } else {
      return res.json({
        success: false,
        error: data,
      });
    }
  } catch (e) {
    error(e);
    log(e);
    return res.json({
      success: false,
      error: e.message,
    });
  }
}
