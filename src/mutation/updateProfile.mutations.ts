import {gql} from '@apollo/client';

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($approveStatus: Boolean!) {
    updateProfile(updateProfileInput: {approveStatus: $approveStatus}) {
      id
      firstName
      approveStatus
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
