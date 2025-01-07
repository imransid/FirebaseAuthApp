import {gql} from '@apollo/client';

export const USER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(registerInput: $input) {
      message
    }
  }
`;
