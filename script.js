document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('attendance-form');
    const attendeeList = document.getElementById('attendee-list');
    let attendees = JSON.parse(localStorage.getItem('attendees')) || [];

    // Function to render the attendee list
    function renderList() {
        attendeeList.innerHTML = '';
        attendees.forEach((attendee, index) => {
            const li = document.createElement('li');
            li.className = attendee.status;
            li.innerHTML = `
                <span>${attendee.name} - ${attendee.status.charAt(0).toUpperCase() + attendee.status.slice(1)}</span>
                <div>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            attendeeList.appendChild(li);
        });
    }

    // Add attendee
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const status = document.getElementById('status').value;
        attendees.push({ name, status });
        localStorage.setItem('attendees', JSON.stringify(attendees));
        form.reset();
        renderList();
    });

    // Edit or delete attendee
    attendeeList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const index = e.target.dataset.index;
            const attendee = attendees[index];
            document.getElementById('name').value = attendee.name;
            document.getElementById('status').value = attendee.status;
            attendees.splice(index, 1);
            localStorage.setItem('attendees', JSON.stringify(attendees));
            renderList();
        } else if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            attendees.splice(index, 1);
            localStorage.setItem('attendees', JSON.stringify(attendees));
            renderList();
        }
    });

    // Initial render
    renderList();
});