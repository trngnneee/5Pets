def buildCategoryTree(categories):
    categoryDict = {str(category['id']): {**category, 'children': []} for category in categories}
    rootCategories = []

    for category in categoryDict.values():
        parentID = category['parent']
        if parentID and str(parentID) in categoryDict:
            categoryDict[str(parentID)]['children'].append(category)
        else:
            rootCategories.append(category)

    return rootCategories