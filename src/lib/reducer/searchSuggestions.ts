type PressedKeyUpAction = {
  type: 'pressed_key_up';
};

type SuggestionsCount = {
  suggestionsCount: number;
};
type PressedKeyDownAction = {
  type: 'pressed_key_down';
  payload: SuggestionsCount;
};

type StoppedTypingAction = {
  type: 'stopped_typing';
  payload: string;
};

type FocusedOnSelectionAction = {
  type: 'hovered_on_suggestion' | 'tabbed_on_suggestion';
  payload: number;
};

export type SuggestionsAction =
  | PressedKeyUpAction
  | PressedKeyDownAction
  | StoppedTypingAction
  | FocusedOnSelectionAction;

type StateProps = {
  activeSuggestionIndex: number;
  suggestionsQuery: string;
};

export default function reducer(state: StateProps, action: SuggestionsAction) {
  if (action.type === 'pressed_key_up') {
    // no more suggestions up left to select
    if (state.activeSuggestionIndex < 1) {
      return state;
    }
    return { ...state, activeSuggestionIndex: state.activeSuggestionIndex - 1 };
  } else if (action.type === 'pressed_key_down') {
    // no more suggestions down left to select
    if (state.activeSuggestionIndex === action.payload.suggestionsCount - 1) {
      return state;
    }
    return { ...state, activeSuggestionIndex: state.activeSuggestionIndex + 1 };
  } else if (action.type === 'stopped_typing') {
    return {
      ...state,
      activeSuggestionIndex: -1,
      suggestionsQuery: action.payload,
    };
  } else if (
    action.type === 'hovered_on_suggestion' ||
    action.type === 'tabbed_on_suggestion'
  ) {
    return {
      ...state,
      activeSuggestionIndex: action.payload,
    };
  }
  return state;
}
