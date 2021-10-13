if data filed is required and data is null then server gives error

# query GetAllUsers{
#   users {
#     id
#     name
#     age
#     nationality
#     friends {
#       name
#     }
#   }
# }

# query GetAllMovie{
#   movies {
#     id
#     name
#     yearOfPublication
#     isInTheaters
#   }
# }

# query GetUser($userId: ID!){
#   user(id: $userId) {
#     name
#     age
#     nationality
#     friends {
#       name
#     }
#     favoriteMovies {
#       name
#       yearOfPublication
#       isInTheaters
#     }
#   }
# }

# query GetMovie($name: String!){
#   movie(name: $name) {
#     name
#     yearOfPublication
#     isInTheaters
#   }
# }



# mutation CreateUser($input: CreateUserInput!){
#   createUser(input: $input) {
#     id
#     name
#     age
#   }
# }

query GetAllUsers{
  users {
    id
    name
    age
    username
  }
}

# mutation CreateUserMutation($input: CreateUserInput!) {
#   createUser(input: $input) {
#     id
#     name
#     age
#   }
# }

mutation($deleteUserId: ID!){
  deleteUser(id: $deleteUserId) {
    id
  }
}


# mutation updateUserName($input: updateUserNameInput!){
#   updateUserName(input: $input) {
#     id
#     username
#   }
# }
