---
date : '2025-07-25T21:33:06+05:30'
draft : false
title : "Is this project important?"
toc : true
tags: ["Open source", "Project"]
image: "https://www.pngitem.com/pimgs/m/788-7882333_wojak-png-transparent-png.png"
---

So I had this weird idea: what if I could run Docker containers that only use IPv6, but still let them connect to all the old-school IPv4-only services that most of the internet still runs on?

it’s not something Docker just magically does out of the box, but it turns out... with a little NAT64 and DNS64 magic, you can actually make it work.


## Why I’m going to do This
Why not? It sounded like a fun project, and I hadn't played with NAT64.

## The Problem
Docker does support IPv6, but only barely. And it doesn’t help you if your container only speaks IPv6 and wants to connect to something that only speaks IPv4.
By default, your IPv6-only container can’t even `curl google.com`, it’ll just hang or fail unless that site has IPv6 support. And most private services don’t.

So… time to cheat. 
- DNS64 - Synthesizes fake IPv6 addresses from real IPv4 DNS records.
- NAT64 - Actually routes that IPv6 traffic to an IPv4 service.

Together, they translate IPv6-only containers into IPv4-speaking champions.

## What I’m Planning to Do?
So here’s the rough plan I thought of,

Create an IPv6-only Docker network (no IPv4 fallback)
1. Build a custom NAT64 gateway written in Go – yes, I didn't started yet :) !
2. Run a DNS64 server (probably using Unbound or a tiny Go-based one later)
3. Point the containers' DNS to that DNS64 server
4. Try accessing IPv4-only services from inside the container and see what breaks

![](https://www.researchgate.net/profile/Gabor-Lencse/publication/299405560/figure/fig3/AS:667671179849730@1536196622082/The-operation-of-the-DNS64-NAT64-solution-an-IPv6-only-client-communicates-with-and-IPv4.png)

## Why Go?
There is no specific reasons because I just want to learn go and Creating CLI apps in golang was very fun and easy!

## Why NAT64/DNS64?
Because they trick your IPv6-only container into thinking the whole world is IPv6-friendly.

When your container tries to resolve example.com, the DNS64 server synthesizes a fake IPv6 address like 64:ff9b::93.184.216.34. The container connects to it via IPv6.

Then the NAT64 gateway on your host intercepts that packet, converts it to IPv4, sends it to the real service, and returns the response back over IPv6.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Farmer_meme_with_apostrophe.jpg/1200px-Farmer_meme_with_apostrophe.jpg)

## What Could Go Wrong?

Let’s be real, probably a lot will go wrong!
- Docker’s IPv6 support is fragile and weird
- Some apps might freak out about fake IPs
- Debugging this stuff takes actual effort (Wireshark, tcpdump, etc.)

Still, I think it'll be worth.

## Like this idea? Want to help?
I created this repo a month ago :) but haven’t started yet! Please help me get this project work, I’m very lazy!
[GitHub Repo - DNAT64](https://github.com/mdxabu/dnat64)


It’s empty for now, so if you want to try it out, contribute, or just follow along, feel free to jump in! Any help or ideas are welcome.












