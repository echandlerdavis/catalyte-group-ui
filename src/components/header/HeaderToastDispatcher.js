const toastDispatcher = {
  open: false,
  message: null,
  setMessage: null,
  toggleOpen: null
};

const setMessage = (message) => {
  toastDispatcher.message = message;
};

const toggleOpen = () => {
  if (toastDispatcher.open) {
    toastDispatcher.open = false;
  } else {
    toastDispatcher.open = true;
  }
};

toastDispatcher.setMessage = setMessage;
toastDispatcher.toggleOpen = toggleOpen;

export default toastDispatcher;
