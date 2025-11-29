import mongoengine as me
from datetime import datetime, timezone

class Pet(me.Document):
    name = me.StringField(required=True)
    category = me.StringField(required=True)
    imageList = me.ListField(me.StringField())
    gender = me.StringField(required=True)
    age = me.FloatField(required=True)
    color = me.StringField(required=True)
    description = me.StringField()
    price = me.FloatField(required=True)
    createdAt = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    updatedAt = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    createdBy = me.StringField()
    updatedBy = me.StringField()
    slug = me.StringField()
    color_slug = me.StringField()

    meta = {
        "collection": "pet"
    }