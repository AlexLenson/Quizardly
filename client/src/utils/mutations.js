import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
       name
      }
    }
  }
`;


export const EDIT_USER = gpl`
`;




export const ADD_QUIZ = gql`
  mutation addThought($name: String!, $category: String!) {
    addThought(name: $name, category: $category) {
      _id
      name
      category
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation addThought($name: String!, $category: String!) {
    addThought(name: $name, category: $category) {
      _id
      name
      category
      user {
        _id
        name
      }
    }
  }
`;