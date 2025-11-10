from model.category import Category

def getAllChildCategoryID(category_id):
    ids = [category_id]
    children = Category.objects(parent=category_id)
    for child in children:
        ids.extend(getAllChildCategoryID(str(child.id)))
    return ids