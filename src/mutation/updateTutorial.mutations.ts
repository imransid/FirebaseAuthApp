import {gql} from '@apollo/client';

export const UPDATE_TUTORIAL = gql`
  mutation UpdateTutorial($id: Float!, $like: Float, $dislike: Float) {
    updateTutorial(
      updateTutorialInput: {id: $id, like: $like, dislike: $dislike}
    ) {
      like
      dislike
    }
  }
`;
