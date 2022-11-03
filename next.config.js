/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_KEY: process.env.API_KEY,
    BASE_URL: process.env.BASE_URL,
    IMAGE_BASE: "https://image.tmdb.org/t/p/w500",
    BACKDROP_IMAGE_BASE: "https://image.tmdb.org/t/p/w1280",
    EMAIL_SERVICE_ID: "service_d3immtm",
    EMAIL_PUBLIC_KEY: "hpZFAAkUOoQZx41Yn",
  },
};

module.exports = nextConfig;
