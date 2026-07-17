import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import BlogCard from "../components/BlogCard";
import { blogPosts } from "../data/blog";

export default function Blog() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Blog"
          title="Writing"
          description="Notes on protocols, systems, and infrastructure — mostly written to make sure I actually understood something, not just used it."
        />

        {blogPosts.length > 0 ? (
          <div className="mt-10 flex max-w-3xl flex-col gap-4">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-text-secondary">Nothing published yet — check back soon.</p>
        )}
      </Container>
    </section>
  );
}
