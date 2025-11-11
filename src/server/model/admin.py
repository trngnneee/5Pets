import mongoengine as me
from datetime import datetime, timezone

class Admin(me.Document):
    fullname = me.StringField(required=True)
    email = me.StringField(required=True)
    password = me.StringField()
    status = me.StringField(default="initial")
    createdAt = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    updatedAt = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    approvedBy = me.StringField()

    meta = {
        "collection": "admin"
    }