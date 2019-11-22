# DEPLOY LINK
http://overflowarnold.s3-website-ap-southeast-1.amazonaws.com

---------------------------------------------------------

FORMAT: 1A
HOST: http://localhost:3000/

# Hacktiv Overflow

Clonig website like stack overflow

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
### Add question [POST]


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

### Read Public [GET]


+ Response 200 (application/json)

        {
            [
              {
                "answerId": [
                  "5dd4c2b2abe6c4164571457f",
                  "5dd4c2cbabe6c41645714580",
                  "5dd594e017a1160d6550a719",
                  "5dd59a7b17a1160d6550a71c"
                ],
                "upvotes": [],
                "downvotes": [
                  "5dd4b354512cdb11cc0d6991"
                ],
                "tags": [
                  "arnold",
                  "code",
                  "vue"
                ],
                "_id": "5dd4b65ac22f6c12e8331817",
                "title": "question satu",
                "description": "aku bahagia tapi bingung banget nich",
                "userId": {
                  "tags": [
                    "code",
                    "arnold"
                  ],
                  "_id": "5dd4b354512cdb11cc0d6991",
                  "name": "arnold therigan",
                  "email": "arnold@mail.com",
                  "password": "$2a$10$yoEQrMV/dLkr8v6AxFVecOZ8y3cO.m066aJTmd5w.8AZNmfte1DTO",
                  "createdAt": "2019-11-20T03:30:28.463Z",
                  "updatedAt": "2019-11-21T04:01:43.365Z"
                },
                "createdAt": "2019-11-20T03:43:22.123Z",
                "updatedAt": "2019-11-20T19:56:57.136Z"
              },
              {
                "answerId": [
                  "5dd4daf0afc8af1bf144ab01"
                ],
                "upvotes": [
                  "5dd4b354512cdb11cc0d6991"
                ],
                "downvotes": [],
                "tags": [
                  "javascript",
                  "code",
                  "vue"
                ],
                "_id": "5dd4cf77b0e4921865093717",
                "title": "question dua",
                "description": "pertanyaan dua",
                "userId": {
                  "tags": [
                    "code",
                    "arnold"
                  ],
                  "_id": "5dd4b354512cdb11cc0d6991",
                  "name": "arnold therigan",
                  "email": "arnold@mail.com",
                  "password": "$2a$10$yoEQrMV/dLkr8v6AxFVecOZ8y3cO.m066aJTmd5w.8AZNmfte1DTO",
                  "createdAt": "2019-11-20T03:30:28.463Z",
                  "updatedAt": "2019-11-21T04:01:43.365Z"
                },
                "createdAt": "2019-11-20T05:30:31.477Z",
                "updatedAt": "2019-11-20T17:33:19.085Z"
              },
              {
                "answerId": [
                  "5dd5360859987b282faaa35b"
                ],
                "upvotes": [],
                "downvotes": [
                  "5dd4b354512cdb11cc0d6991"
                ],
                "tags": [
                  "javascript",
                  "vue",
                  "router"
                ],
                "_id": "5dd535f159987b282faaa35a",
                "title": "question tiga",
                "description": "pertanyaan tiga",
                "userId": {
                  "tags": [
                    "code",
                    "arnold"
                  ],
                  "_id": "5dd4b354512cdb11cc0d6991",
                  "name": "arnold therigan",
                  "email": "arnold@mail.com",
                  "password": "$2a$10$yoEQrMV/dLkr8v6AxFVecOZ8y3cO.m066aJTmd5w.8AZNmfte1DTO",
                  "createdAt": "2019-11-20T03:30:28.463Z",
                  "updatedAt": "2019-11-21T04:01:43.365Z"
                },
                "createdAt": "2019-11-20T12:47:45.338Z",
                "updatedAt": "2019-11-20T17:33:54.435Z"
              },
              {
                "answerId": [],
                "upvotes": [
                  "5dd4e1ee9020cf1ee6cb5003"
                ],
                "downvotes": [],
                "tags": [
                  "javascript",
                  "mongoose"
                ],
                "_id": "5dd57c6217a1160d6550a718",
                "title": "How do I update/upsert a document in Mongoose?",
                "description": "<p>Perhaps it's the time, perhaps it's me drowning in sparse documentation and not being able to wrap my head around the concept of updating in Mongoose :)</p><p>Here's the deal:</p><p>I have a contact schema and model (shortened properties):</p><pre class=\"ql-syntax\" spellcheck=\"false\">var mongoose = require('mongoose'),\n    Schema = mongoose.Schema;\n\nvar mongooseTypes = require(\"mongoose-types\"),\n    useTimestamps = mongooseTypes.useTimestamps;\n\n\nvar ContactSchema = new Schema({\n    phone: {\n        type: String,\n        index: {\n            unique: true,\n            dropDups: true\n        }\n    },\n    status: {\n        type: String,\n        lowercase: true,\n        trim: true,\n        default: 'on'\n    }\n});\nContactSchema.plugin(useTimestamps);\nvar Contact = mongoose.model('Contact', ContactSchema);\n</pre><p><br></p>",
                "userId": {
                  "tags": [
                    "code",
                    "arnold"
                  ],
                  "_id": "5dd4b354512cdb11cc0d6991",
                  "name": "arnold therigan",
                  "email": "arnold@mail.com",
                  "password": "$2a$10$yoEQrMV/dLkr8v6AxFVecOZ8y3cO.m066aJTmd5w.8AZNmfte1DTO",
                  "createdAt": "2019-11-20T03:30:28.463Z",
                  "updatedAt": "2019-11-21T04:01:43.365Z"
                },
                "createdAt": "2019-11-20T17:48:18.500Z",
                "updatedAt": "2019-11-20T18:14:28.638Z"
              }
            ]
        }


### Read Private [GET]


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
        
## Questions:id [/question/${id}]
###  Question Detail [GET]

+ Parameters
    + id (number) - ID of the Question in the form of an integer


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
          "answerId": [
            {
              "upvotes": [],
              "downvotes": [],
              "_id": "5dd5360859987b282faaa35b",
              "description": "ini jawaban dari arnold",
              "userId": {
                "tags": [],
                "_id": "5dd4b354512cdb11cc0d6991",
                "name": "arnold therigan",
                "email": "arnold@mail.com",
                "password": "$2a$10$yoEQrMV/dLkr8v6AxFVecOZ8y3cO.m066aJTmd5w.8AZNmfte1DTO",
                "createdAt": "2019-11-20T03:30:28.463Z",
                "updatedAt": "2019-11-20T03:30:28.463Z"
              },
              "createdAt": "2019-11-20T12:48:08.706Z",
              "updatedAt": "2019-11-20T12:48:08.706Z"
            }
          ],
          "upvotes": [],
          "downvotes": [],
          "tags": [
            "javascript",
            "vue",
            "router"
          ],
          "_id": "5dd535f159987b282faaa35a",
          "title": "question tiga",
          "description": "pertanyaan tiga",
          "userId": "5dd4b354512cdb11cc0d6991",
          "createdAt": "2019-11-20T12:47:45.338Z",
          "updatedAt": "2019-11-20T12:48:08.967Z"
        }

+ Response 400 (application/json)

        {
          "message": "not authorized"
        }

### Delete Question [DELETE]

+ Parameters
    + id (number) - ID of the Question in the form of an integer


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
            {
              "n": 1,
              "opTime": {
                "ts": "6761229391008628737",
                "t": 5
              },
              "electionId": "7fffffff0000000000000005",
              "ok": 1,
              "operationTime": "6761229391008628737",
              "$clusterTime": {
                "clusterTime": "6761229391008628737",
                "signature": {
                  "hash": "/5DwE4Eb3zQdV9RPy6crpHgxvaM=",
                  "keyId": "6745199709771530241"
                }
              },
              "deletedCount": 1
            }
        }

+ Response 400 (application/json)

        {
          "message": "not authorized"
        }

