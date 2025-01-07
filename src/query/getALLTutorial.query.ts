import {gql} from '@apollo/client';

export const GET_ALL_TUTORIALS_QUERY = gql`
  query GetAllTutorials {
    getAllTutorials {
      id
      title
      image
      videoUrl
      category
      description
      like
      dislike
    }
  }
`;
