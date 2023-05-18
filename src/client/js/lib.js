function showModal(modalId){
    let event = new Event('openModal');
    event.detail = document.querySelector(`#modal-${modalId}`);
    document.querySelector(`#modal-${modalId}`).dispatchEvent(event);
}

function closeModal(modalId) {
    let event = new Event('closeModal');
    event.detail = document.querySelector(`#modal-${modalId}`);
    document.querySelector(`#modal-${modalId}`).dispatchEvent(event);
}