import mongoengine as me

class Customer(me.Document):
    fullname = me.StringField(required=True)
    email = me.StringField(required=True)

    meta = {
        "collection": "customer"
    }