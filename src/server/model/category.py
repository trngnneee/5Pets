import mongoengine as me
from datetime import datetime, timezone

class Category(me.Document):
    name = me.StringField(required=True)
    parent = me.StringField(required=True)
    avatar = me.StringField()
    createdAt = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    updatedAt = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    createdBy = me.StringField()
    updatedBy = me.StringField()

    meta = {
        "collection": "category"
    }