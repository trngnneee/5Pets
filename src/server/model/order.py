import mongoengine as me

class Order(me.Document):
    address=me.StringField(required=True)
    phone=me.StringField(required=True)
    note=me.StringField()
    total=me.FloatField(required=True)
    customer_id=me.ReferenceField('Customer', required=True)
    payment_method=me.StringField(required=True)
    status=me.StringField(default="pending") 
    updated_by=me.StringField()

    meta = {
        "collection": "order"
    }