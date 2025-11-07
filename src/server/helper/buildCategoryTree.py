def build_category_tree(categories):
    category_dict = {str(category['id']): {**category, 'children': []} for category in categories}
    root_categories = []

    for category in category_dict.values():
        parent_id = category['parent']
        if parent_id and str(parent_id) in category_dict:
            category_dict[str(parent_id)]['children'].append(category)
        else:
            root_categories.append(category)

    return root_categories