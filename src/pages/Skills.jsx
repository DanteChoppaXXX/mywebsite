import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import SkillCategoryCard from "../components/SkillCategoryCard";
import { skillCategories } from "../data/skills";

export default function Skills() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="Technical Skills"
          description="Tools and concepts I reach for regularly, grouped by where they sit in the stack."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <SkillCategoryCard
              key={category.category}
              category={category.category}
              items={category.items}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
