import { categories, type SoundCategory } from "@util/sounds";
import { FolderFill } from "react-bootstrap-icons";

export interface EditDialogCategoriesProps {
  selectedCategory: SoundCategory;
  onSelectCategory: (category: SoundCategory) => void;
}

export function EditDialogCategoriesList({
  selectedCategory,
  onSelectCategory,
}: EditDialogCategoriesProps) {
  return (
    <ul className="flex flex-col max-w-36 w-full border-r border-zinc-800/50">
      {categories.map((category) => (
        <li key={category.id}>
          <button
            onClick={() => onSelectCategory(category)}
            className={`py-1.5 px-2 rounded-l-lg w-full text-start text-zinc-500 text-sm font-medium hover:text-zinc-50
                            flex items-center gap-1.5 transition-colors ${
                              category === selectedCategory
                                ? "bg-zinc-800/50 !text-zinc-50"
                                : ""
                            }`}>
            <FolderFill className="w-4 h-4 min-w-4 min-h-4"></FolderFill>
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
