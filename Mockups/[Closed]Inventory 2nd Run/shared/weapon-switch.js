(function () {
  'use strict';

  const states = new WeakMap();
  const initializedRoots = new WeakSet();
  const listImages = {
    m16:'../assets/weapon-m16.png',
    m249:'../assets/weapon-m249.png',
    p1911:'../assets/weapon-p1911.png',
    aug:'../assets/item-vicinity-weapon.png'
  };
  const descriptions = {
    m16:'5.56mm 탄약을 사용하는 돌격소총입니다.',
    m249:'5.56mm 탄약을 사용하는 경기관총입니다.',
    p1911:'9mm 탄약을 사용하는 권총입니다.',
    aug:'5.56mm 탄약을 사용하는 불펍 돌격소총입니다.'
  };

  function prototypeCode(root) {
    const code = root.dataset.prototype || root.id.replace('inventory-', '');
    return code.replace(/^(\d)([a-z])$/, '$1-$2');
  }

  function weaponKey(name) {
    return String(name || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function cardImage(root, key) {
    const prototype = prototypeCode(root);
    if (key === 'aug') return listImages.aug;
    if (prototype.startsWith('4-')) return '../assets/weapon-' + key + '-diagonal-4a.png';
    if (prototype.startsWith('2-') || prototype.startsWith('3-')) return '../assets/weapon-' + key + '-oriented.png';
    return listImages[key] || '';
  }

  function mainWeaponCards(root) {
    return Array.from(root.querySelectorAll('.weapon-card[data-weapon-group="main"]')).slice(0, 2);
  }

  function announce(root, text) {
    const message = root.querySelector('.interaction-message');
    if (message) message.textContent = text;
  }

  function initializeRoot(root) {
    if (initializedRoots.has(root)) return;
    initializedRoots.add(root);
    mainWeaponCards(root).forEach((card, index) => {
      const name = card.querySelector('.weapon-name')?.textContent.trim() || (index === 0 ? 'M16' : 'M249');
      const key = weaponKey(name);
      card.dataset.weaponSwitchSlot = String(index + 1);
      card.dataset.equippedWeaponKey = key;
      card.dataset.equippedWeaponType = card.querySelector('.weapon-class')?.textContent.trim() || '주 무기';
      card.dataset.equippedWeaponDescription = descriptions[key] || '현재 장착된 주 무기입니다.';
      card.dataset.equippedListImage = listImages[key] || '';
      card.dataset.equippedCardImage = cardImage(root, key);
    });
  }

  function cardPayload(root, card) {
    initializeRoot(root);
    const name = card.querySelector('.weapon-name')?.textContent.trim() || '주 무기';
    const key = card.dataset.equippedWeaponKey || weaponKey(name);
    return {
      name,
      key,
      type:card.dataset.equippedWeaponType || card.querySelector('.weapon-class')?.textContent.trim() || '주 무기',
      category:'weapon',
      description:card.dataset.equippedWeaponDescription || descriptions[key] || '현재 장착된 주 무기입니다.',
      image:card.dataset.equippedListImage || listImages[key] || '',
      cardImage:card.dataset.equippedCardImage || cardImage(root, key)
    };
  }

  function tilePayload(root, source) {
    const name = source.dataset.itemName || 'AUG';
    const key = weaponKey(name);
    return {
      name,
      key,
      type:source.dataset.itemType || '주 무기',
      category:'weapon',
      description:source.dataset.description || descriptions[key] || '장착 가능한 주 무기입니다.',
      image:source.dataset.image || listImages[key] || '',
      cardImage:source.dataset.cardImage || cardImage(root, key)
    };
  }

  function renderLooseWeaponTile(source, payload) {
    source.dataset.itemName = payload.name;
    source.dataset.itemType = payload.type;
    source.dataset.itemCategory = 'weapon';
    source.dataset.description = payload.description;
    source.dataset.image = payload.image;
    source.dataset.cardImage = payload.cardImage;
    delete source.dataset.compatibility;
    delete source.dataset.compatibleWeaponGroups;

    const icon = source.querySelector('.item-icon');
    const label = source.querySelector('.item-name');
    const count = source.querySelector('.item-count');
    if (icon || label) {
      source.style.removeProperty('background-image');
      if (icon) icon.style.backgroundImage = payload.image ? "url('" + payload.image + "')" : 'none';
      if (label) label.textContent = payload.name;
      if (count) count.textContent = '1';
      return;
    }

    source.style.backgroundImage = payload.image ? "url('" + payload.image + "')" : 'none';
    source.replaceChildren();
  }

  function applyWeaponToCard(root, card, payload) {
    const key = payload.key || weaponKey(payload.name);
    card.dataset.equippedWeaponKey = key;
    card.dataset.equippedWeaponType = payload.type;
    card.dataset.equippedWeaponDescription = payload.description;
    card.dataset.equippedListImage = payload.image;
    card.dataset.equippedCardImage = payload.cardImage || cardImage(root, key);
    card.classList.remove('weapon-dropped');

    const name = card.querySelector('.weapon-name');
    if (name) name.textContent = payload.name;

    const imageUrl = card.dataset.equippedCardImage;
    const prototype = prototypeCode(root);
    const visual = card.querySelector('.weapon-visual');
    const body = card.querySelector('.weapon-body');
    if (prototype.startsWith('1-')) {
      if (visual) visual.style.backgroundImage = imageUrl ? "url('" + imageUrl + "')" : 'none';
    } else if (body) {
      body.style.backgroundImage = imageUrl ? "url('" + imageUrl + "')" : 'none';
    } else if (visual) {
      visual.style.backgroundImage = imageUrl ? "url('" + imageUrl + "')" : 'none';
    }
    if (visual) visual.setAttribute('aria-label', payload.name + ' weapon image with unchanged attachment sockets');
  }

  function refreshSourceFocus(source) {
    if (!(source instanceof HTMLElement) || !source.isConnected) return;
    source.blur();
    requestAnimationFrame(() => source.focus({ preventScroll:true }));
  }

  function swapIntoCard(root, source, card) {
    const incoming = tilePayload(root, source);
    const outgoing = cardPayload(root, card);
    renderLooseWeaponTile(source, outgoing);
    applyWeaponToCard(root, card, incoming);
    const slot = card.dataset.weaponSwitchSlot || String(mainWeaponCards(root).indexOf(card) + 1);
    announce(root, incoming.name + '을(를) 주 무기 슬롯 ' + slot + '에 장착하고 ' + outgoing.name + '을(를) 주변으로 이동했습니다');
    refreshSourceFocus(source);
  }

  function renderModalGuide(root) {
    const actions = root.querySelector('.tooltip-actions');
    if (!actions) return;
    const action = document.createElement('span');
    action.className = 'tooltip-action';
    const key = document.createElement('span');
    key.className = 'tooltip-action-key';
    key.textContent = 'A';
    action.append(key, document.createTextNode(' 슬롯 선택'));
    actions.replaceChildren(action);
  }

  function focusTarget(root, state, index) {
    state.index = Math.max(0, Math.min(state.targets.length - 1, index));
    state.targets.forEach((card, cardIndex) => {
      const focused = cardIndex === state.index;
      card.classList.toggle('weapon-switch-focused', focused);
      card.setAttribute('aria-selected', focused ? 'true' : 'false');
    });
    state.targets[state.index].focus({ preventScroll:true });
  }

  function startSelection(root, source) {
    initializeRoot(root);
    const targets = mainWeaponCards(root);
    if (targets.length < 2) {
      announce(root, '교체할 주 무기 슬롯을 찾을 수 없습니다');
      return;
    }
    const state = { source, targets, index:0 };
    states.set(root, state);
    root.classList.add('weapon-switch-active');
    targets.forEach((card, index) => {
      card.classList.add('weapon-switch-target');
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', '주 무기 슬롯 ' + (index + 1) + ': ' + cardPayload(root, card).name);
    });
    renderModalGuide(root);
    announce(root, (source.dataset.itemName || '무기') + '을(를) 장착할 주 무기 슬롯을 선택하세요');
    focusTarget(root, state, 0);
  }

  function clearSelection(root, focusSource) {
    const state = states.get(root);
    if (!state) return;
    state.targets.forEach((card) => {
      card.classList.remove('weapon-switch-target', 'weapon-switch-focused');
      card.removeAttribute('tabindex');
      card.removeAttribute('role');
      card.removeAttribute('aria-label');
      card.removeAttribute('aria-selected');
    });
    root.classList.remove('weapon-switch-active');
    states.delete(root);
    if (focusSource) refreshSourceFocus(state.source);
  }

  function confirmSelection(root) {
    const state = states.get(root);
    if (!state) return;
    const source = state.source;
    const target = state.targets[state.index];
    const incomingName = source.dataset.itemName || 'AUG';
    clearSelection(root, false);
    swapIntoCard(root, source, target);
    announce(root, incomingName + '을(를) 선택한 주 무기 슬롯에 장착했습니다. 교체된 무기는 주변 목록으로 이동했습니다');
  }

  function cancelSelection(root) {
    const state = states.get(root);
    if (!state) return;
    const name = state.source.dataset.itemName || '무기';
    clearSelection(root, true);
    announce(root, name + ' 주 무기 슬롯 선택 취소');
  }

  function isVicinityWeapon(target) {
    return target instanceof HTMLButtonElement
      && target.dataset.itemCategory === 'weapon'
      && Boolean(target.closest('.vicinity-region'));
  }

  function handleAction(root, action) {
    if (!(root instanceof HTMLElement)) return false;
    initializeRoot(root);
    const state = states.get(root);
    if (state) {
      if (action === 'select') confirmSelection(root);
      else if (action === 'back') cancelSelection(root);
      else announce(root, '주 무기 슬롯을 선택하거나 B를 눌러 취소하세요');
      return true;
    }

    const current = document.activeElement;
    if (!isVicinityWeapon(current)) return false;
    if (action === 'quick') {
      const target = mainWeaponCards(root)[0];
      if (target) swapIntoCard(root, current, target);
      return true;
    }
    if (action === 'select') {
      startSelection(root, current);
      return true;
    }
    return false;
  }

  function moveFocus(root, direction) {
    const state = states.get(root);
    if (!state) return false;
    if (direction === 'left') focusTarget(root, state, state.index - 1);
    else if (direction === 'right') focusTarget(root, state, state.index + 1);
    else focusTarget(root, state, state.index);
    return true;
  }

  const style = document.createElement('style');
  style.textContent = [
    '.weapon-switch-target { outline:3px solid #58e879; outline-offset:-5px; cursor:pointer; }',
    '.weapon-switch-target.weapon-switch-focused { outline-color:#f3d521; box-shadow:inset 0 0 0 2px #f3d521; }',
    '.weapon-switch-active .weapon-card[data-weapon-group="sidearm"] { opacity:0.42; }'
  ].join('\n');
  document.head.appendChild(style);

  window.InventoryWeaponSwitch = {
    handleAction,
    moveFocus,
    isActive(root) { return states.has(root); }
  };
}());
