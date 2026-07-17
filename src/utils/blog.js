import { blogPosts } from "../data/blog";

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug) {
  const index = blogPosts.findIndex((post) => post.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? blogPosts[index - 1] : null,
    next: index < blogPosts.length - 1 ? blogPosts[index + 1] : null,
  };
}

export function formatDate(isoDate) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
