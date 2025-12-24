+++
draft = false
title = 'Subscribe'
toc = false
comments = false
+++

<form id="subscribe-form">
  <input
    type="email"
    id="email"
    placeholder="Enter your email"
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

  await fetch("https://api.github.com/repos/mdxabu/rss-mailer/dispatches", {
    method: "POST",
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": "token PUBLIC_TRIGGER_TOKEN",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      event_type: "new_subscriber",
      client_payload: { email }
    })
  });

  msg.innerText = "Check your inbox!";
});
</script>

</script>
