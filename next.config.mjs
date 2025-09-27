/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google profile pics
      'ui-avatars.com',             // Avatar service
      'res.cloudinary.com' ,
      'drive.google.com'         // Cloudinary images
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
