function createSprite() {
    const container = document.getElementById('spriteContainer');
    const sprite = document.createElement('div');
    sprite.className = 'sprite';

    // Callsign Input
    const callsignGroup = document.createElement('div');
    callsignGroup.className = 'input-group';
    const callsignLabel = document.createElement('label');
    callsignLabel.innerText = 'Callsign: ';
    const callsignInput = document.createElement('input');
    callsignInput.type = 'text';
    callsignInput.name = 'callsign';
    callsignGroup.appendChild(callsignLabel);
    callsignGroup.appendChild(callsignInput);

    // Department Input
    const departmentGroup = document.createElement('div');
    departmentGroup.className = 'input-group';
    const departmentLabel = document.createElement('label');
    departmentLabel.innerText = 'Department: ';
    const departmentInput = document.createElement('input');
    departmentInput.type = 'text';
    departmentInput.name = 'department';
    departmentGroup.appendChild(departmentLabel);
    departmentGroup.appendChild(departmentInput);

    // Status Dropdown
    const statusGroup = document.createElement('div');
    statusGroup.className = 'input-group';
    const statusLabel = document.createElement('label');
    statusLabel.innerText = 'Status: ';
    const statusSelect = document.createElement('select');
    statusSelect.name = 'status';
    const option1 = document.createElement('option');
    option1.value = '10-8';
    option1.text = '10-8';
    const option2 = document.createElement('option');
    option2.value = '10-6';
    option2.text = '10-6';
    const option3 = document.createElement('option');
    option3.value = '10-7';
    option3.text = '10-7';
    statusSelect.appendChild(option1);
    statusSelect.appendChild(option2);
    statusSelect.appendChild(option3);
    statusGroup.appendChild(statusLabel);
    statusGroup.appendChild(statusSelect);

    // Add Button
    const addButton = document.createElement('button');
    addButton.innerText = 'Add';
    addButton.className = 'button';
    addButton.style.display = 'block';
    addButton.onclick = function () {
        moveSprite(sprite, statusSelect.value);
        addButton.style.display = 'none';
        makeSpriteEditable(sprite, callsignInput.value, departmentInput.value, statusSelect.value, statusSelect);
    };

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function () {
        sprite.remove();
    };

    // Append inputs to sprite
    sprite.appendChild(callsignGroup);
    sprite.appendChild(departmentGroup);
    sprite.appendChild(statusGroup);
    sprite.appendChild(addButton);
    sprite.appendChild(deleteButton);

    // Append sprite to container
    container.appendChild(sprite);

    // Event listener to update column when status changes
    statusSelect.addEventListener('change', function () {
        moveSprite(sprite, statusSelect.value);
    });
}

function moveSprite(sprite, status) {
    const columns = {
        '10-6': document.getElementById('status-10-6'),
        '10-7': document.getElementById('status-10-7'),
        '10-8': document.getElementById('status-10-8')
    };
    // Remove sprite from any current column
    Object.values(columns).forEach(column => {
        if (column.contains(sprite)) {
            column.removeChild(sprite);
        }
    });
    // Append sprite to the new column based on status
    columns[status].appendChild(sprite);
}

function makeSpriteEditable(sprite, callsign, department, status, statusSelect) {
    // Create a readable format of the sprite's details
    sprite.innerHTML = `
        <div>Callsign: ${callsign}</div>
        <div>Department: ${department}</div>
        <div>Status: <select name="status">
            <option value="10-8" ${status === '10-8' ? 'selected' : ''}>10-8</option>
            <option value="10-6" ${status === '10-6' ? 'selected' : ''}>10-6</option>
            <option value="10-7" ${status === '10-7' ? 'selected' : ''}>10-7</option>
        </select></div>
        <div class="input-group">
            <label for="notes">Notes:</label>
            <textarea name="notes" rows="3"></textarea>
        </div>
        <button class="delete-button">Delete</button>
    `;

    // Add event listener to the new status select element
    sprite.querySelector('select').addEventListener('change', function (event) {
        moveSprite(sprite, event.target.value);
    });

    // Add event listener to the delete button
    sprite.querySelector('.delete-button').addEventListener('click', function () {
        sprite.remove();
    });
}
