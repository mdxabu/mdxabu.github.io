+++
draft = false
title = "Subscribe"
toc = false
comments = false
+++

Get email updates whenever I publish a new post.

<form id="subscribe-form">
  <input
    type="email"
    id="email"
    placeholder="you@example.com"
    required
  />
  <button type="submit">Subscribe</button>
</form>

<p id="msg"></p>

<script>
document.getElementById("subscribe-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const msg = document.getElementById("msg");

  msg.innerText = "Subscribing...";

  const res = await fetch("https://api.github.com/repos/mdxabu/rss-mailer/dispatches", {
    method: "POST",
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      event_type: "subscribe",
      client_payload: { email }
    })
  });

  msg.innerText = res.ok
    ? "Subscription successful!"
    : "Something went wrong";
});
</script>
