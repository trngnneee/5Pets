import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";

export function buildCategoryTree(categories, setParent) {
  const map = new Map();

  categories.forEach((cat) => {
    const parentId = cat.parent || "root";
    if (!map.has(parentId)) map.set(parentId, []);
    map.get(parentId).push(cat);
  });

  function renderItems(parentId = "root", level = 0) {
    const items = map.get(parentId) || [];
    return items.map((cat) => (
      <React.Fragment key={cat.id}>
        <DropdownMenuItem onClick={() => setParent(cat.id)}>
          {"--".repeat(level)} {cat.name}
        </DropdownMenuItem>
        {renderItems(cat.id, level + 1)}
      </React.Fragment>
    ));
  }

  return renderItems();
}
