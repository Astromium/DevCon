const modal = document.getElementById('modal');
const contacts = document.getElementById('contacts');

const toggleMessages = () => {
  modal.classList.add('open');
  contacts.classList.add('show');
};

const closeMessages = () => {
  modal.classList.remove('open');
  contacts.classList.remove('show');
};
