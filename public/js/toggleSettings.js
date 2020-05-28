const toggleSettings = (ident) => {
  const id = ident.split('-')[1];
  const settingsContainer = document.getElementById(`settings-${id}`);
  settingsContainer.classList.toggle('show');
};

export default toggleSettings;
