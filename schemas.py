from marshmallow import Schema, fields 


# class SocietySchema(Schema):
#     name = fields.Str(required=True)
#     price = fields.Int(required=True)

# class SocietyGetSchema(Schema):
#     id = fields.Str(dump_only=True)
#     name = fields.Str(dump_only=True)
#     price = fields.Int(dump_only=True)

class RestaurantDetailSchema(Schema):
    rst_id = fields.Str(required=True)
    
class SuccessMessageSchema(Schema):
    message = fields.Str(dump_only=True)

class HomepageSchema(Schema):
    locate = fields.Str(required=True)

# class SocietyQuerySchema(Schema):
#     id = fields.Str(required=True)

# class SocietyOptionalQuerySchema(Schema):
#     id = fields.Str(required=False)


class SignupSchema(Schema):
    mobile = fields.Str(required=True)
    emailid = fields.Str(required=True)
    password = fields.Str(required=True)


class UserLogoutSchema(Schema):
    user_id = fields.Str(required=True)
    logout_time = fields.DateTime(required=True)
    track_id = fields.Str(required=True)
    track_time = fields.Str(required=True)

class SignupQuerySchema(Schema):
    token = fields.Int(required=True)

class SubscribeSchema(Schema):
    emailid = fields.Str(required=True)
    
class SubscribeQuerySchema(Schema):
    message = fields.Str(required=True)

class UserListSchema(Schema):
    result = fields.List(fields.String(), required=True)

class LoginSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True)

class LoginQuerySchema(Schema):
    id = fields.Str(required=True)
    mobile = fields.Str(required=True)
    emailid = fields.Str(required=True)
    password = fields.Str(required=True)

class CreateShopSchema(Schema):
    username = fields.Str(required=True)
    mobile = fields.Str(required=True)
    email = fields.Str(required=True)
    passcode = fields.Str(required=True)
    pan = fields.Str(required=True)
    rst_name = fields.Str(required=True)
    house = fields.Str(required=True)
    street = fields.Str(required=True)
    city = fields.Str(required=True)
    state = fields.Str(required=True)
    pin = fields.Str(required=True)
    rating = fields.Str(required=True)
    keyfood = fields.Str(required=True)

class GetHomepage(Schema):
    data = fields.List(fields.String(), required=True)
    
class UserLoginSchema(Schema):
    email = fields.Str(required=True)
    login_time = fields.DateTime(required=True)

class UserDetailSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Str(required=True)
    login_time = fields.DateTime(required=True)
    
class UserDeleteSchema(Schema):
    user_id = fields.Str(required=True)
    
class UserSignupSchema(Schema):
    email = fields.Str(required=True)
    
class VisitorLoginQuerySchema(Schema):
    username = fields.Str(required=True)
    passcode = fields.Str(required=True)

class AddFavouriteSchema(Schema):
    parentid = fields.Str(required=True)
    user_id = fields.Str(required=True)

class GetFavouriteSchema(Schema):
    user_id = fields.Str(required=True)


class PlanStatusQuerySchema(Schema):
    user_id = fields.Str(required=True)

class RemoveFavouriteSchema(Schema):
    user_id = fields.Str(required=True)
    parentid = fields.Str(required=True)
    
class AddAudioSchema(Schema):
    title = fields.Str(required=True)
    description = fields.Str(required=True)
    rating = fields.Str(required=True)
    author = fields.Str(required=True)
    link = fields.Str(required=True)
    length = fields.Str(required=True)
    totalpart = fields.Str(required=True)
    image_url = fields.Str(required=True)
    keywords = fields.Str(required=True)
    drive_link = fields.Str(required=True)
    language = fields.Str(required=True)

class GetCartSchema(Schema):
    cst_id = fields.Str(required=True)
    
class PlaceOrderSchema(Schema):
    user_id = fields.Str(required=True)
    payment_date = fields.DateTime(required=True)
    pay_id = fields.Str(required=True)
    
    
class GuestQuerySchema(Schema):
    query = fields.Str(required=True)
    