// TODO: move into toast directory
// TODO: dispatch = action type handled by reducer. RENAME service? signaler?
// TODO: Check with Kathleen/Chandler/Kaschae for pattern
// TODO: Ask Kathleen if I should move logic to ProductCard onclick

const toastDispatcher = {
  open: null,
  statusSetter: null,
  configure: null,
  message: null,
  setMessage: null,
  toggleOpen: null,
  getOpenStatus: () => toastDispatcher.open
};

const runConfigure = (stateVariable, setter) => {
  toastDispatcher.open = stateVariable;
  toastDispatcher.statusSetter = (isOpen) => setter(isOpen);
};

const setMessage = (message) => {
  toastDispatcher.message = message;
};

const toggleOpen = () => {
  if (toastDispatcher.getOpenStatus) {
    toastDispatcher.statusSetter(false);
  } else {
    toastDispatcher.statusSetter(true);
  }
};

toastDispatcher.setMessage = setMessage;
toastDispatcher.toggleOpen = toggleOpen;
toastDispatcher.configure = runConfigure;

export default toastDispatcher;
