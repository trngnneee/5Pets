import mongoengine as me

class ForgotPassword(me.Document):
    email = me.StringField(required=True)
    otp = me.StringField(required=True)
    expire_at = me.DateTimeField(required=True)
    meta = {
        "collection": "forgot_password",
        "indexes": [
            {
                "fields": ["expire_at"],
                "expireAfterSeconds": 0
            }
        ]
    }