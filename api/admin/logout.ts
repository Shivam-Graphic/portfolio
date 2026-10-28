export default function handler(req: any, res: any) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  res.setHeader("Set-Cookie", [
    "cms_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
    "cms_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
  ]);

  if (req.method === "GET") {
    res.writeHead(302, { Location: "/admin/" });
    res.end();
    return;
  }

  res.status(200).json({ success: true });
}
