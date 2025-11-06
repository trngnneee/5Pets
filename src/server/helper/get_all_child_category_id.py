from model.category import Category

def get_all_child_category_ids(category_id):
    ids = [category_id]
    children = Category.objects(parent=category_id)
    for child in children:
        ids.extend(get_all_child_category_ids(str(child.id)))
    return ids