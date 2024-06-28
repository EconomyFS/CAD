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

    // Department Input (Dropdown)
    const departmentGroup = document.createElement('div');
    departmentGroup.className = 'input-group';
    const departmentLabel = document.createElement('label');
    departmentLabel.innerText = 'Department: ';
    const departmentSelect = document.createElement('select');
    departmentSelect.name = 'department';
    const departments = ['USBP', 'USMS', 'USP', 'FCSO', 'APD'];
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.text = dept;
        departmentSelect.appendChild(option);
    });
    departmentGroup.appendChild(departmentLabel);
    departmentGroup.appendChild(departmentSelect);

    // Status Dropdown
    const statusGroup = document.createElement('div');
    statusGroup.className = 'input-group';
    const statusLabel = document.createElement('label');
    statusLabel.innerText = 'Status: ';
    const statusSelect = document.createElement('select');
    statusSelect.name = 'status';
    const statusOptions = ['10-8', '10-6', '10-7'];
    statusOptions.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.text = optionText;
        statusSelect.appendChild(option);
    });
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
        makeSpriteEditable(sprite, callsignInput.value, departmentSelect.value, statusSelect.value, statusSelect);
    };

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete-button';

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

    // Event listener for delete button
    deleteButton.addEventListener('click', function () {
        sprite.remove();
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

    // Reattach delete button event listener
    const deleteButton = sprite.querySelector('.delete-button');
    if (deleteButton) {
        deleteButton.removeEventListener('click', deleteSprite);
        deleteButton.addEventListener('click', deleteSprite);
    }
}

function deleteSprite(event) {
    const sprite = event.target.closest('.sprite');
    if (sprite) {
        sprite.remove();
    }
}

function resetAll() {
    const container = document.getElementById('spriteContainer');
    container.innerHTML = ''; // Remove all sprites
}
