<h1 align="center">Welcome to short-link 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> system for shortening links in seconds.

## Requirements

- Node.js 20+
- Yarn
- Docker and Docker Compose (optional)

## Setup

### Environment Variables

Add the following environment variables to your `.env` file:

```bash
  cp .env.example .env
```

- `DATABASE_URL`: The URL of the database to use. Defaults to `postgresql://postgres:postgres@localhost:5432/short-link?schema=public`
- `JWT_SECRET`: The secret to use for JWT tokens.
- `JWT_ACCESS_EXPIRES`: The expiration time for JWT tokens. Defaults to `7d`

OBS: Make sure to update the `DATABASE_URL` and `JWT_SECRET` in the `.env` file before starting the application.

### Install

if you are using Docker, run the following command:

```bash
  docker-compose up -d
```

or run the following command

```bash
  yarn install
  yarn prisma:push
```

## Usage

```sh
  yarn start:dev
```

## Features

- Custom Short URLs: Allow users to create custom aliases for their shortened URLs, making them more memorable and brandable.
- Analytics Dashboard: Provide detailed analytics for each shortened URL, including the number of clicks, geographic location of clicks, referral sources, and device types.
- Expiration Dates: Enable users to set expiration dates for their shortened URLs, after which the links will no longer be active.
- Password Protection: Allow users to protect their shortened URLs with a password, ensuring that only those with the password can access the link.
- QR Code Generation: Automatically generate QR codes for each shortened URL, making it easy to share links offline.
- API Access: Offer an API that developers can use to integrate your URL shortening service into their own applications.
- Bulk URL Shortening: Allow users to shorten multiple URLs at once, which can be particularly useful for marketing campaigns.
- Custom Domains: Let users use their own custom domains for shortened URLs, enhancing their brand identity.
- Link Preview: Provide a preview of the destination page before redirecting, which can help users trust the link.
- Integration with Other Services: Integrate with popular services like social media platforms, email marketing tools, and CRM systems to streamline the sharing and tracking of links.
- User Roles and Permissions: Implement different user roles and permissions, allowing for team collaboration with varying levels of access and control.
- Security Features: Add features like spam detection, phishing protection, and SSL encryption to ensure the safety and integrity of the links.

## Author

👤 **Richard Neves**

- Website: <https://richard-neves.vercel.app/>
- Github: [@rickneves15](https://github.com/rickneves15)
- LinkedIn: [@richard-neves](https://linkedin.com/in/richard-neves)
