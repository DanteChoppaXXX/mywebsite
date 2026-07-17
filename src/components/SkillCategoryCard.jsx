import Card from "./ui/Card";
import Badge from "./ui/Badge";
import { CATEGORY_ICONS } from "../constants/skillIcons";

export default function SkillCategoryCard({ category, items }) {
  const Icon = CATEGORY_ICONS[category];

  return (
    <Card>
      <div className="flex items-center gap-2.5">
        {Icon && <Icon className="text-lg text-accent" aria-hidden="true" />}
        <h3 className="font-semibold text-text-primary">{category}</h3>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </Card>
  );
}
