const data = JSON.parse(localStorage.getItem('kanban')) || {
  todo: ['Learn JavaScript', 'Build a project'],
  progress: ['Review code'],
  done: ['Set up environment'],
};

const columns = { todo: 'colTodo', progress: 'colProgress', done: 'colDone' };
let draggedCard = null;
let editingCol = null;
let editingIdx = null;

const modalOverlay = document.getElementById('modalOverlay') || createModal();

function createModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modalOverlay';
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'cardModal';
  modal.innerHTML = `
    <h2 id="modalTitle">Add Card</h2>
    <textarea id="modalText" placeholder="Enter card text..."></textarea>
    <div class="modal-actions">
      <button class="cancel-btn" id="modalCancel">Cancel</button>
      <button class="confirm-btn" id="modalConfirm">Save</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.appendChild(modal);
  return overlay;
}

function getModal() {
  return document.getElementById('cardModal');
}

function save() {
  localStorage.setItem('kanban', JSON.stringify(data));
}

function render() {
  Object.keys(columns).forEach(col => {
    const el = document.getElementById(columns[col]);
    el.innerHTML = '';
    data[col].forEach((text, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.draggable = true;
      card.dataset.col = col;
      card.dataset.index = i;
      card.innerHTML = `
        <div>${text}</div>
        <div class="card-actions">
          <button class="edit-btn" data-col="${col}" data-index="${i}">✎</button>
          <button class="delete-btn" data-col="${col}" data-index="${i}">✕</button>
        </div>
      `;

      card.addEventListener('dragstart', () => {
        draggedCard = { col, index: i };
        card.classList.add('dragging');
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        draggedCard = null;
        document.querySelectorAll('.col-body').forEach(b => b.classList.remove('drag-over'));
      });

      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-actions')) return;
        editingCol = col;
        editingIdx = i;
        openModal('Edit Card', text, (val) => {
          data[col][i] = val;
          save();
          render();
        });
      });

      el.appendChild(card);
    });
  });
}

document.querySelectorAll('.col-body').forEach(body => {
  body.addEventListener('dragover', (e) => {
    e.preventDefault();
    body.classList.add('drag-over');
  });

  body.addEventListener('dragleave', () => {
    body.classList.remove('drag-over');
  });

  body.addEventListener('drop', (e) => {
    e.preventDefault();
    body.classList.remove('drag-over');
    if (!draggedCard) return;
    const targetCol = body.closest('.column').dataset.col;
    const sourceCol = draggedCard.col;
    const idx = draggedCard.index;

    if (sourceCol === targetCol) return;

    const [card] = data[sourceCol].splice(idx, 1);
    data[targetCol].push(card);
    save();
    render();
  });
});

document.querySelectorAll('.add-card-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const col = btn.dataset.col;
    editingCol = col;
    editingIdx = null;
    openModal('Add Card', '', (val) => {
      data[col].push(val);
      save();
      render();
    });
  });
});

function openModal(title, initial, onSubmit) {
  const modal = getModal();
  modalOverlay.classList.add('active');
  modal.classList.add('active');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalText').value = initial;
  document.getElementById('modalText').focus();

  const confirm = document.getElementById('modalConfirm');
  const cancel = document.getElementById('modalCancel');

  const cleanup = () => {
    modalOverlay.classList.remove('active');
    modal.classList.remove('active');
    confirm.replaceWith(confirm.cloneNode(true));
    cancel.replaceWith(cancel.cloneNode(true));
  };

  document.getElementById('modalConfirm').addEventListener('click', () => {
    const val = document.getElementById('modalText').value.trim();
    if (val) {
      onSubmit(val);
      cleanup();
    }
  });

  document.getElementById('modalCancel').addEventListener('click', cleanup);

  document.getElementById('modalText').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      document.getElementById('modalConfirm').click();
    }
  });
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const col = e.target.dataset.col;
    const idx = e.target.dataset.index;
    data[col].splice(idx, 1);
    save();
    render();
  }
  if (e.target.classList.contains('edit-btn')) {
    const col = e.target.dataset.col;
    const idx = e.target.dataset.index;
    editingCol = col;
    editingIdx = idx;
    openModal('Edit Card', data[col][idx], (val) => {
      data[col][idx] = val;
      save();
      render();
    });
  }
});

render();
