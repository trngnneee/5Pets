import mongoengine as me

class Admin(me.Document):
    fullname = me.StringField(required=True)
    email = me.StringField(required=True)
    password = me.StringField()

    meta = {
        "collection": "admin"
    }