# DEPLOY LINK
http://overflowarnold.s3-website-ap-southeast-1.amazonaws.com

---------------------------------------------------------


FORMAT: 1A
HOST: http://localhost:3000/

# Hacktiv Overflow

Clonig website lie stack overflow

## User Register [/users/register]

### register [POST]
+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@mail.com",
            "password": "Gajah123",
            "tags": "javascript,code"
        }
+ Response 200 (application/json)

        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FqYWggbHVjdSIsImVtYWlsIjoiZ2FqYWhAbWFpbC5jb20iLCJfaWQiOiI1ZGJmNGVhZTFlOGNjZTJiNTkxMmQwNzEiLCJpYXQiOjE1NzI4MTg2MDd9.zE-Eif8lae9_k109u3HLPydLg-ODbl9Apg2rczFz-8E",
            "name": "gajah lucu",
            "_id": "5dbf4eae1e8cce2b5912d071",
            "tags": [
                "javascript",
                "code"
            ]
        }
        

+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@mail.com",
            "password": "Gajah123"
        }
+ Response 400

        {
            "message": "email is already been used"
        }

+ Request (application/json)

        {
            "name": "",
            "email": "",
            "password": ""
        }
+ Response 400

        {
            "message": [
                "name is required",
                "email is required",
                "password is required"
            ]
        }
        
+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@x",
            "password": "Gajah123"
        }
+ Response 400

        {
            "message": [
                "invalid email format"
            ]
        }

+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@mail.com",
            "password": "gajah"
        }
+ Response 400

        {
            "message": [
                 "password shold contain at least one digit, one lower case , one upper case , minumum 6 char"
            ]
        }

## User Login [/users/login]

### login [POST]
+ Request (application/json)

        {
            "email": "gajah@mail.com",
            "password": "Gajah123"
        }
+ Response 200 (application/json)

        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FqYWggbHVjdSIsImVtYWlsIjoiZ2FqYWhAbWFpbC5jb20iLCJfaWQiOiI1ZGJmNGVhZTFlOGNjZTJiNTkxMmQwNzEiLCJpYXQiOjE1NzI4MTg2MDd9.zE-Eif8lae9_k109u3HLPydLg-ODbl9Apg2rczFz-8E",
            "name": "gajah lucu",
            "_id": "5dbf4eae1e8cce2b5912d071"
        }
        

+ Request (application/json)

        {
            "name": "",
            "email": "",
            "password": ""
        }
+ Response 400

        {
            "message": [
                "invalid email/password"
            ]
        }
        
## User  [/users]

### Get [GET]
+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
          "tags": [],
          "_id": "5dd4b354512cdb11cc0d6991",
          "name": "arnold therigan",
          "email": "arnold@mail.com",
          "password": "$2a$10$yoEQrMV/dLkr8v6AxFVecOZ8y3cO.m066aJTmd5w.8AZNmfte1DTO",
          "createdAt": "2019-11-20T03:30:28.463Z",
          "updatedAt": "2019-11-20T03:30:28.463Z"
        }
        

+ Response 403

        {
            "message": [
                "not authorized"
            ]
        }

### Add tags [PUT]
+ Request (multipart/form-data)

        {
              "tags": "code,arnold"
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 201 (application/json)

        {
            {
              "message": "tags updated"
            }
        }

## Questions [/question]
### Update product [POST]


+ Request (multipart/form-data)

        {
            "title": "pertanyaan kancil",
            "description": "kancil kancil kancil",
            "tags": "javascript,kancil,lucu"
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
            {
              "answerId": [],
              "upvotes": [],
              "downvotes": [],
              "tags": [
                "javascript",
                "kancil",
                "lucu"
              ],
              "_id": "5dd5393559987b282faaa35c",
              "title": "pertanyaan kancil",
              "description": "kancil kancil kancil",
              "userId": "5dd4e1ee9020cf1ee6cb5003",
              "createdAt": "2019-11-20T13:01:41.654Z",
              "updatedAt": "2019-11-20T13:01:41.654Z"
            }
        }

+ Response 400 (application/json)

        {
          "message": "not authorized"
        }
