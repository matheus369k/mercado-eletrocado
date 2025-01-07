/* eslint-disable indent */
import { useReducer } from 'react';

interface StateType {
  previewImage: string;
  isLoading: boolean;
}

interface ActionType {
  type: string;
  payload?: { previewImage: string };
}

const actionTypes = {
  SET_PREVIEW_IMAGE: 'set/image',
  FINISH_LOADING_IMAGE: 'finish/loading',
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case actionTypes.SET_PREVIEW_IMAGE:
      return {
        isLoading: true,
        previewImage: action.payload.previewImage,
      };
    case actionTypes.FINISH_LOADING_IMAGE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const usePreview = ({ img }: { img: string }) => {
  const [state, dispatch] = useReducer(reducer, {
    previewImage: img,
    isLoading: true,
  });

  const handleSetNewPreviewImage = (previewImage: string) => {
    dispatch({ type: actionTypes.SET_PREVIEW_IMAGE, payload: { previewImage } });
  };

  const handleFinishLoadingPreviewImage = () => {
    dispatch({ type: actionTypes.FINISH_LOADING_IMAGE });
  };

  return {
    handleSetNewPreviewImage,
    handleFinishLoadingPreviewImage,
    state,
  };
};
