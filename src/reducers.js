
export const TOGGLE_MUTE = "TOGGLE_MUTE";
export const SET_GAIN = "SET_GAIN";

export const initialState = [
	{
	  name: "L",
	  receive: [
		{
		  gain: 1.0,
		  mute: false,
		},
		{
		  gain: 0.0,
		  mute: false,
		},
	  ],
	},
	{
	  name: "R",
	  receive: [
		{
		  gain: 0.0,
		  mute: false,
		},
		{
		  gain: 1.0,
		  mute: false,
		},
	  ],
	},
  ];

const toggleMute = (state, action) => 
  state.map((output, outputIndex) =>
    outputIndex !== action.payload.outputIndex
      ? output
      : {
          ...output,
          receive: output.receive.map((input, inputIndex) =>
            inputIndex !== action.payload.inputIndex
              ? input
              : {
                  ...input,
                  mute: !input.mute,
                }
          ),
        }
  );

const setGain = (state, action) =>
  state.map((output, outputIndex) =>
    outputIndex !== action.payload.outputIndex
      ? output
      : {
          ...output,
          receive: output.receive.map((input, inputIndex) =>
            inputIndex !== action.payload.inputIndex
              ? input
              : {
                  ...input,
                  gain: action.payload.value,
                }
          ),
        }
  );

export const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_MUTE:
      return toggleMute(state, action);
    case SET_GAIN:
      return setGain(state, action);
    default:
      throw new Error(`Unhandled action dispatched: ${action.type}`);
  }
};
