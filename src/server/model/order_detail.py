import mongoengine as me
from datetime import datetime, timezone

class OrderDetail(me.Document):
    order_id = me.ReferenceField('Order', required=True)
    pet_id = me.ReferenceField('Pet', required=True)
    quantity = me.FloatField(required=True)
    order_detail_total = me.FloatField(required=True)

    meta = {
        "collection": "order_detail"
    }