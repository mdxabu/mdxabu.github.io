---
date : '2025-01-23T16:57:43+05:30'
draft : false
title : 'Beehive: Leveraging the Expression of Marginalised Peoples.'
toc : false
tags: [community, open source]
image: "https://static.vecteezy.com/system/resources/thumbnails/002/832/778/small/light-blue-green-pattern-in-square-style-rectangles-with-colorful-gradient-on-abstract-background-best-design-for-your-ad-poster-banner-vector.jpg"
---

This project is compelling for its core aim of supporting marginalised people. Many individuals use art to express their emotions, and this work helps researchers understand behavioral and emotional patterns within these communities.

## Beehive
*A data federation approach to analyze behavioral health and complement healthcare practice with community health metrics.*

This project analyzes behavioral health and complements healthcare practice with community health metrics in Alaska using a data federation approach. By leveraging data from diverse sources, it generates insights into behavioral health patterns and helps improve healthcare practices in the community.

### Beehive Overview

Beehive provides patients with simple interfaces to upload artistic and photographic representations and to retain ownership of their digital content. Images are stored in an unstructured NoSQL datastore for scalability and to support semi structured and unstructured data, unlike the structured, well defined formats of clinical data.

Images are indexed using patient provided textual annotations as identifiers and descriptors. These indexes are stored as metadata in an indexed datastore, enabling efficient query and retrieval. Users such as healthcare providers, social workers, caregivers, or administrators can search this metadata through the Data Access and Query Interface to view patient contributed images alongside corresponding clinical data from the EHR. This pointer based architecture integrates clinical and visual data without requiring a unified data warehouse.

### System Architecture and Features

The Beehive prototype is a Python Flask web application that allows patients to upload and manage artwork, attach narratives with optional audio and sentiment labels, and view, edit, or delete their multimodal data.

Authentication supports traditional login backed by MongoDB as well as Google OAuth 2.0. Access is role based: the user role can manage only its own data and cannot see other users’ artwork, while the admin role can manage all users and content. Session management includes a “Remember Me” option, and privacy is strictly enforced so users cannot access one another’s content.

Profiles store the name, email, and username, along with the account creation time and role (defaulting to user).

The upload interface is delivered through a custom HTML form that works in modern web browsers. Only the image is required; all other fields are optional. Each upload can include a narrative description (context, emotions, etc.), a custom title, optional audio, and a user defined or preset sentiment label.

Data is stored in MongoDB across separate collections for users, admin accounts, and artworks. Passwords are stored using bcrypt hashes, and the system robustly handles incomplete submissions.

### Integration with Google Ecosystem

Beehive also supports a Google Forms based upload workflow that simplifies submission on mobile devices. Submissions capture the email, title, narrative, and image file. Images are stored in Google Drive and metadata in a linked Google Sheet, and a synchronization process ingests this data into MongoDB while creating or updating user profiles as needed. This approach lowers the barrier to participation and promotes accessibility.

### Performance Testing

Load testing with Locust achieved approximately 30 requests per second with zero failures. The /api/admin/dashboard endpoint is heavier due to database aggregations, whereas /api/admin/user_uploads/{user_id} and /api/admin/notifications are lightweight. At peak load, the 95th percentile response time spikes to about six seconds, primarily on heavier endpoints, while the median remains near zero for most requests. Overall, Beehive performs well under realistic user loads of roughly 100 to 200 concurrent users, and optimizing heavy endpoints could further improve performance.

### Privacy and Security

Images and user data are protected, and only authorized users, the content owners and admins, can access image data. Admins review uploads and manage content across the system, and role based access control enforces strict privacy protocols.

This project is both technically sound and socially impactful, giving marginalized communities a voice through expressive mediums while helping researchers and healthcare providers better understand emotional and behavioral health.

The project also participated in Google Summer of Code 2025 with Alaska, and Ishaan Gupta contributed outstanding work.

See the project here: https://github.com/KathiraveluLab/Beehive
