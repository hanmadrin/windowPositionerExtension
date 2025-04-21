document.getElementById('save').addEventListener('click', () => {
  const pos = parseInt(document.getElementById('position').value);
  if (pos >= 1 && pos <= 6) {
    chrome.storage.local.set({ position: pos }, () => {
      chrome.runtime.sendMessage({ action: 'openAndPosition' });
    });
  } else {
    alert('Please enter a value between 1 and 6.');
  }
});