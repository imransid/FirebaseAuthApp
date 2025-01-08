import {gql} from '@apollo/client';

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateApprovalStatus($id: Int!, $approveStatus: Boolean!) {
    updateUserApprovalStatus(id: $id, approveStatus: $approveStatus) {
      id
      firstName
      lastName
      email
      approveStatus
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
